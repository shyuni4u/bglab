<?
include './lib/connection.php';
include './lib/allow.php';
header('Content-Type: application/json; charset=UTF-8');

DBOpen();

$method = $_SERVER['REQUEST_METHOD'];
$conn = $GLOBALS['DBconn'];

if ($method == 'GET') {
  try {
    $conn->autocommit(FALSE);

    $player_id = empty($_GET['player_id']) ? null : $_GET['player_id'];
    $start_date = empty($_GET['start_date']) ? null : $_GET['start_date'];
    $end_date = empty($_GET['end_date']) ? null : $_GET['end_date'];

    $limit_size = empty($_GET['limit_size']) ? null : $_GET['limit_size'];

    $sql = " SELECT";
    $sql .= " id,";
    $sql .= " hero,";
    $sql .= " placement,";
    $sql .= " turn_count,";
    $sql .= " mmr,";
    $sql .= " hs_version,";
    $sql .= " DATE_FORMAT(dt_now, '%Y-%m-%d %H:%i') AS dt_now";
    $sql .= " FROM game";
    $sql .= " WHERE 1=1";
    if ($player_id != null)   $sql .= ' AND player_id=?';
    if ($start_date != null)  $sql .= ' AND (DATE(dt_now) BETWEEN ? AND ?)';
    $sql .= " ORDER BY dt_now DESC";
    if ($limit_size != null)  $sql .= ' LIMIT '.$limit_size;
    $sql .= ' ;';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('iss', $player_id, $start_date, $end_date);
    $stmt->execute();
    $stmt->bind_result($row['game'], $row['hero'], $row['placement'], $row['turn_count'], $row['mmr'], $row['hs_version'], $row['dt_now']);
    //, $row['card_id'], $row['card_type'], $row['card_order'], $row['health'], $row['atk'], $row['etc']

    $where_result = array();
    $result_game = array();
    while($stmt->fetch()) {
      array_push($where_result, $row['game']);
      array_push($result_game, array(
        'game' => $row['game'],
        'hero' => $row['hero'],
        'placement' => $row['placement'],
        'turn_count' => $row['turn_count'],
        'mmr' => $row['mmr'],
        'hs_version' => $row['hs_version'],
        'dt_now' => $row['dt_now']
      ));
    }

    $where_str = implode(",", $where_result);

    $sql = " SELECT";
    $sql .= " game_id,";
    $sql .= " card_id,";
    $sql .= " card_type,";
    $sql .= " card_order,";
    $sql .= " health,";
    $sql .= " atk,";
    $sql .= " etc";
    $sql .= " FROM last_board";
    $sql .= " WHERE game_id IN ($where_str)";
    $sql .= " ORDER BY game_id DESC, card_order";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $stmt->bind_result($row['game_id'], $row['card_id'], $row['card_type'], $row['card_order'], $row['health'], $row['atk'], $row['etc']);

    $result_card = array();
    while($stmt->fetch()) {
      array_push($result_card, array(
        'game_id' => $row['game_id'],
        'card_id' => $row['card_id'],
        'card_type' => $row['card_type'],
        'card_order' => $row['card_order'],
        'health' => $row['health'],
        'atk' => $row['atk'],
        'etc' => $row['etc']
      ));
    }

    $conn->commit();
    echo json_encode(array('resultJson' => $result_game, 'resultCardJson' => $result_card));
  } catch (Exception $ex) {
    echo json_encode(array('resultJson' => $ex));
    $conn->rollBack();
  }
} else {
  echo json_encode(array('resultJson' => 'else'));
}
DBClose();
?>