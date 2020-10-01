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
    $min_mmr = empty($_GET['min_mmr']) ? null : $_GET['min_mmr'];
    $max_mmr = empty($_GET['max_mmr']) ? null : $_GET['max_mmr'];
    $start_date = $_GET['start_date'];
    $end_date = $_GET['end_date'];
    $limit_size = empty($_GET['limit_size']) ? null : $_GET['limit_size'];
    
    $sql = ' SELECT';
    $sql .= ' hero,';
    $sql .= ' AVG(placement) AS hero_avg,';
    $sql .= ' SUM(CASE WHEN placement = 1 THEN 1 ELSE 0 END) AS crown_cnt,';
    $sql .= ' SUM(CASE WHEN placement < 5 THEN 1 ELSE 0 END) AS win_cnt,';
    $sql .= ' COUNT(hero) AS total_cnt';
    $sql .= ' FROM view_game_filter';
    $sql .= ' WHERE 1 = 1';
    $sql .= ' AND hero != ""';
    if ($player_id != null) $sql .= ' AND player_id=?';
    if ($max_mmr != null)   $sql .= ' AND mmr > ? AND mmr <= ?';
    $sql .= ' AND (DATE(dt_now) BETWEEN ? AND ?)';
    $sql .= ' GROUP BY hero';
    $sql .= ' ORDER BY total_cnt DESC, hero_avg';
    if ($limit_size != null)  $sql .= ' LIMIT '.$limit_size;
    $sql .= ' ;';
    $stmt = $conn->prepare($sql);
    if ($player_id != null) $stmt->bind_param('iss', $player_id, $start_date, $end_date);
    if ($max_mmr != null) $stmt->bind_param('iiss', $min_mmr, $max_mmr, $start_date, $end_date);
    $stmt->execute();
    $stmt->bind_result($row['hero'], $row['hero_avg'], $row['crown_cnt'], $row['win_cnt'], $row['total_cnt']);

    $result = array();
    while($stmt->fetch()) {
      array_push($result, array(
        'hero' => $row['hero'],
        'hero_avg' => $row['hero_avg'],
        'crown_cnt' => $row['crown_cnt'],
        'win_cnt' => $row['win_cnt'],
        'total_cnt' => $row['total_cnt']
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