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
    
    $sql = " SELECT";
    $sql .= " c.id AS minion,";
    $sql .= " c.cname AS minion_name,";
    $sql .= " c.is_gold AS is_gold,";
    $sql .= " COUNT(c.id) AS game_cnt,";
    $sql .= " SUM(CASE WHEN placement = 1 THEN 1 ELSE 0 END) AS crown_cnt,";
    $sql .= " SUM(CASE WHEN placement < 5 THEN 1 ELSE 0 END) AS win_cnt,";
    $sql .= " AVG(placement) AS minion_avg,";
    $sql .= " SUM(used_cnt) AS used_cnt";
    $sql .= " FROM card c";
    $sql .= " JOIN (";
    $sql .= " SELECT";
    $sql .= " g.id AS game_id,";
    $sql .= " g.placement,";
    $sql .= " ub.card_id,";
    $sql .= " COUNT(card_id) AS used_cnt";
    $sql .= " FROM view_game_filter g";
    $sql .= " JOIN (";
    $sql .= " SELECT";
    $sql .= " game_id,";
    $sql .= " card_id";
    $sql .= " FROM used_card";
    $sql .= " WHERE card_type = 'Minion'";
    $sql .= " UNION";
    $sql .= " SELECT";
    $sql .= " game_id,";
    $sql .= " card_id";
    $sql .= " FROM action_board";
    $sql .= " WHERE action_type='deck'";
    $sql .= " ) ub ON ub.game_id = g.id";
    $sql .= " WHERE 1 = 1";
    if ($player_id != null) $sql .= " AND player_id=?";
    if ($max_mmr != null)   $sql .= " AND mmr > ? AND mmr <= ?";
    $sql .= " AND (DATE(dt_now) BETWEEN ? AND ?)";
    $sql .= " GROUP BY g.id, g.placement, ub.card_id";
    $sql .= " ) rs ON rs.card_id = c.id";
    $sql .= " GROUP BY c.id, c.cname, c.is_gold";
    $sql .= " ORDER BY used_cnt DESC, win_cnt DESC, c.id, c.cname";
    if ($limit_size != null)  $sql .= " LIMIT $limit_size";
    $sql .= " ;";
    $stmt = $conn->prepare($sql);
    if ($player_id != null) $stmt->bind_param('iss', $player_id, $start_date, $end_date);
    if ($max_mmr != null) $stmt->bind_param('iiss', $min_mmr, $max_mmr, $start_date, $end_date);
    $stmt->execute();
    $stmt->bind_result($row['minion'], $row['minion_name'], $row['is_gold'], $row['game_cnt'], $row['crown_cnt'], $row['win_cnt'], $row['minion_avg'], $row['used_cnt']);

    $result = array();
    while($stmt->fetch()) {
      array_push($result, array(
        'minion' => $row['minion'],
        'minion_name' => $row['minion_name'],
        'game_cnt' => $row['game_cnt'],
        'is_gold' => $row['is_gold'],
        'crown_cnt' => $row['crown_cnt'],
        'win_cnt' => $row['win_cnt'],
        'minion_avg' => $row['minion_avg'],
        'used_cnt' => $row['used_cnt']
      ));
    }

    $conn->commit();
    echo json_encode(array('resultJson' => $result, 'sql' => $sql));
  } catch (Exception $ex) {
    echo json_encode(array('resultJson' => $ex));
    $conn->rollBack();
  }
} else {
  echo json_encode(array('resultJson' => 'else'));
}
DBClose();
?>