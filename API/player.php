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

    $player_id = $_GET['player_id'];
    $start_date = $_GET['start_date'];
    $end_date = $_GET['end_date'];
    $limit_size = empty($_GET['limit_size']) ? null : $_GET['limit_size'];

    $sql = ' SELECT';
    $sql .= ' p.uname AS pname';
    $sql .= ' ,SUM(CASE WHEN placement = 1 THEN 1 ELSE 0 END) AS crown';
    $sql .= ' ,SUM(CASE WHEN placement < 5 THEN 1 ELSE 0 END) AS win';
    $sql .= ' ,COUNT(player_id) AS cnt';
    $sql .= ' ,AVG(placement) AS avg';
    $sql .= ' FROM player p';
    $sql .= ' JOIN (';
      $sql .= ' SELECT';
      $sql .= ' *';
      $sql .= ' FROM view_game_filter g';
      $sql .= ' WHERE 1 = 1';
      $sql .= ' AND player_id=?';
      $sql .= ' AND (DATE(dt_now) BETWEEN ? AND ?)';
      $sql .= ' ORDER BY dt_now DESC';
      if ($limit_size != null)  $sql .= ' LIMIT '.$limit_size;
    $sql .= ' ) g  ON p.id = g.player_id';
    $sql .= ' GROUP BY player_id';
    $sql .= ' ORDER BY dt_now DESC';
    $sql .= ' ;';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('iss', $player_id, $start_date, $end_date);
    $stmt->execute();
    $stmt->bind_result($row['pname'], $row['crown'], $row['win'], $row['cnt'], $row['avg']);

    $result = array();
    while($stmt->fetch()) {
      array_push($result, array(
        'pname' => $row['pname'],
        'crown' => $row['crown'],
        'win' => $row['win'],
        'cnt' => $row['cnt'],
        'avg' => $row['avg']
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