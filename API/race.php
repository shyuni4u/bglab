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

    $size = empty($_GET['size']) ? null : $_GET['size'];
    $player_id = empty($_GET['player_id']) ? null : $_GET['player_id'];
    $min_mmr = empty($_GET['min_mmr']) ? null : $_GET['min_mmr'];
    $max_mmr = empty($_GET['max_mmr']) ? null : $_GET['max_mmr'];
    $start_date = $_GET['start_date'];
    $end_date = $_GET['end_date'];
    $limit_size = empty($_GET['limit_size']) ? null : $_GET['limit_size'];
    $placement = empty($_GET['placement']) ? 9 : $_GET['placement'];

    if ($size == 'mini') {
      $sql = " SELECT";
      $sql .= " race,";
      $sql .= " COUNT(race) AS cnt";
      $sql .= " FROM view_game_race";
      $sql .= " WHERE 1 = 1";
      $sql .= " AND player_id=?";
      $sql .= " AND (DATE(dt_now) BETWEEN ? AND ?)";
      $sql .= " GROUP BY";
      $sql .= " race";
      $sql .= " ORDER BY";
      $sql .= " race";
      $sql .= " ;";
      $stmt = $conn->prepare($sql);
      $stmt->bind_param('iss', $player_id, $start_date, $end_date);
      $stmt->execute();
      $stmt->bind_result($row['race'], $row['cnt']);
  
      $result = array();
      while($stmt->fetch()) {
        array_push($result, array(
          'name' => $row['race'],
          'value' => $row['cnt']
        ));
      }
  
      $conn->commit();
      echo json_encode(array('resultJson' => $result));
    } else {
      $sql = " SELECT";
      $sql .= " race,";
      $sql .= " card_id,";
      $sql .= " count(card_id) AS cnt";
      $sql .= " FROM view_game_race vgr";
      $sql .= " JOIN last_board lb ON lb.game_id = vgr.game_id";
      $sql .= " WHERE 1 = 1";
      $sql .= ' AND placement < ?';
      if ($player_id != null) $sql .= ' AND player_id = ?';
      if ($max_mmr != null)   $sql .= ' AND mmr > ? AND mmr <= ?';
      $sql .= " AND (DATE(dt_now) BETWEEN ? AND ?)";
      $sql .= " GROUP BY";
      $sql .= " race,";
      $sql .= " card_id";
      $sql .= " ORDER BY";
      $sql .= " race,";
      $sql .= " cnt DESC";
      $sql .= " ;";
      $stmt = $conn->prepare($sql);
      if ($player_id != null) $stmt->bind_param('iiss', $placement, $player_id, $start_date, $end_date);
      if ($max_mmr != null) $stmt->bind_param('iiiss', $placement, $min_mmr, $max_mmr, $start_date, $end_date);
      $stmt->execute();
      $stmt->bind_result($row['race'], $row['card_id'], $row['cnt']);
  
      $result = array();
      while($stmt->fetch()) {
        array_push($result, array(
          'race' => $row['race'],
          'cid' => $row['card_id'],
          'value' => $row['cnt']
        ));
      }
  
      $conn->commit();
      echo json_encode(array('resultJson' => $result));
    }
  } catch (Exception $ex) {
    echo json_encode(array('resultJson' => $ex));
    $conn->rollBack();
  }
} else {
  echo json_encode(array('resultJson' => 'else'));
}
DBClose();
?>