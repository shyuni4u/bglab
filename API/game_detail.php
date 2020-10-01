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
    $sql .= ' vw_gt.chk,';
    $sql .= ' vw_gt.card_id,';
    $sql .= ' vw_gt.card_type,';
    $sql .= ' vw_gt.turn,';
    $sql .= ' vw_gt.card_order,';
    $sql .= ' c.cname,';
    $sql .= ' c.is_gold';
    $sql .= ' FROM view_game_detail vw_gt';
    $sql .= ' LEFT JOIN card c ON c.id = vw_gt.card_id';
    $sql .= ' WHERE vw_gt.game_id = ?';
    $sql .= ' ORDER BY vw_gt.turn, vw_gt.chk, vw_gt.card_order';
    $sql .= ' ;';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $game_id);
    $stmt->execute();
    $stmt->bind_result($row['chk'], $row['card_id'], $row['card_type'], $row['turn'], $row['card_order'], $row['cname'], $row['is_gold']);

    $result = array();
    while($stmt->fetch()) {
      array_push($result, array(
        'chk' => $row['chk'],
        'card_id' => $row['card_id'],
        'cname' => $row['cname'],
        'is_gold' => $row['is_gold'],
        'card_type' => $row['card_type'],
        'turn' => $row['turn'],
        'order' => $row['card_order']
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