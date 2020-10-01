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

    $sql = ' SELECT';
    $sql .= ' id,';
    $sql .= ' cname,';
    $sql .= ' clade';
    $sql .= ' FROM card';
    $sql .= ' WHERE is_gold = 1';
    $sql .= ' AND type = "Minion";';
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $stmt->bind_result($row['id'], $row['cname'], $row['clade']);

    $result = array();
    while($stmt->fetch()) {
      array_push($result, array(
        'id' => $row['id'],
        'cname' => $row['cname'],
        'clade' => $row['clade']
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