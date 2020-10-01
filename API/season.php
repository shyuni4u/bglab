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
    $sql .= ' sname,';
    $sql .= ' start_date,';
    $sql .= ' end_date';
    $sql .= ' FROM season';
    $sql .= ' ORDER BY start_date DESC';
    $sql .= ' ;';
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $stmt->bind_result($row['sname'], $row['start_date'], $row['end_date']);

    $result = array();
    while($stmt->fetch()) {
      array_push($result, array(
        'sname' => $row['sname'],
        'start_date' => $row['start_date'],
        'end_date' => $row['end_date']
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