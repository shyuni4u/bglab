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

    $search_player_name = $_GET['player'].'%';
    $sql = 'SELECT id, uname FROM player where uname like ? limit 5;';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $search_player_name);
    $stmt->execute();
    $stmt->bind_result($row['id'], $row['uname']);

    $result = array();
    while($stmt->fetch()) {
      array_push($result, array(
        'value' => $row['id'],
        'text' => $row['uname']
      ));
    }

    $conn->commit();
    echo json_encode(array('resultJson' => $result));
  } catch (Exception $ex) {
    print_r($ex);
    $conn->rollBack();
  }
} else {
  echo json_encode(array('resultJson' => 'else'));
}
DBClose();
?>