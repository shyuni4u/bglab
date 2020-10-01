<?
include "./lib/connection.php";
include "./lib/allow.php";
header("Content-Type: application/json; charset=UTF-8");

DBOpen();

$method = $_SERVER["REQUEST_METHOD"];
$conn = $GLOBALS["DBconn"];

if ($method == "GET") {
  try {
    $conn->autocommit(FALSE);

    $game_id = empty($_GET["game_id"]) ? null : intval($_GET["game_id"]);

    $sql = " SELECT";
    $sql .= " b_type,";
    $sql .= " action_type,";
    $sql .= " action_value,";
    $sql .= " card_id,";
    $sql .= " card_type,";
    $sql .= " card_order,";
    $sql .= " turn,";
    $sql .= " idx,";
    $sql .= " health,";
    $sql .= " atk,";
    $sql .= " etc";
    $sql .= " FROM view_game_detail2";
    $sql .= " WHERE game_id=$game_id";
    $sql .= " ORDER BY";
    $sql .= " turn,";
    //$sql .= " (CASE WHEN b_type = 'bob' THEN 1 ELSE (CASE WHEN b_type = 'action' THEN 3 ELSE (CASE WHEN b_type = 'turn' THEN 5 ELSE 10 END) END) END),";
    //$sql .= " b_type,";
    $sql .= " idx";
    $sql .= " ;";
    $stmt = $conn->prepare($sql);
    //$stmt->bind_param("s", $game_id);
    $stmt->execute();
    $stmt->bind_result($row["b_type"], $row["action_type"], $row["action_value"], $row["card_id"], $row["card_type"], $row["card_order"], $row["turn"], $row["idx"], $row["health"], $row["atk"], $row["etc"]);

    $result = array();
    while($stmt->fetch()) {
      array_push($result, array(
        "board_type" => $row["b_type"],
        "action_type" => $row["action_type"],
        "action_value" => $row["action_value"],
        "card_id" => $row["card_id"],
        "card_type" => $row["card_type"],
        "card_order" => $row["card_order"],
        "turn" => $row["turn"],
        "idx" => $row["idx"],
        "health" => $row["health"],
        "atk" => $row["atk"],
        "etc" => $row["etc"]
      ));
    }

    $conn->commit();
    echo json_encode(array("resultJson" => $result));
  } catch (Exception $ex) {
    echo json_encode(array("resultJson" => $ex));
    $conn->rollBack();
  }
} else {
  echo json_encode(array("resultJson" => "else"));
}
DBClose();
?>