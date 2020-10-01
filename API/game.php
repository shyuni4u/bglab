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

    $game_id = empty($_GET['game_id']) ? null : $_GET['game_id'];

    $sql = ' SELECT';
    $sql .= ' id AS game,';
    $sql .= ' hero,';
    $sql .= ' placement,';
    $sql .= ' turn_count,';
    $sql .= ' mmr,';
    $sql .= ' hs_version,';
    $sql .= ' DATE_FORMAT(dt_now, "%Y-%m-%d %H:%i") AS dt_now';
    $sql .= ' FROM game';
    $sql .= ' WHERE 1 = 1';
    if ($game_id != null)     $sql .= ' AND id=?';
    $sql .= ' ORDER BY dt_now DESC';
    $sql .= ' ;';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $game_id);
    $stmt->execute();
    $stmt->bind_result($row['game'], $row['hero'], $row['placement'], $row['turn_count'], $row['mmr'], $row['hs_version'], $row['dt_now']);

    $result = array();
    while($stmt->fetch()) {
      array_push($result, array(
        'game' => $row['game'],
        'hero' => $row['hero'],
        'placement' => $row['placement'],
        'turn_count' => $row['turn_count'],
        'mmr' => $row['mmr'],
        'hs_version' => $row['hs_version'],
        'dt_now' => $row['dt_now']
      ));
    }

    $conn->commit();
    echo json_encode(array('resultJson' => $result));
  } catch (Exception $ex) {
    echo json_encode(array('resultJson' => $ex));
    $conn->rollBack();
  }
} else {
  echo json_encode(array('resultJson' => 'else'));
}
DBClose();
?>