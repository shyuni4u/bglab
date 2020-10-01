<?
namespace BGParser;

require_once __DIR__ . "/../lib/common.php";

class Card {
  public $idx;
  public $entityName;
  public $id;
  public $zone;
  public $zonePos;
  public $cardId;
  public $player;
  public $tags;

  public $entity_id;
  public $turn;
  public $action;
  public $action_value;

  private $lib;

  public function __construct($obj) {
    $lib = new Common();
    if (substr($obj, 0, 1) == "[") {
      $obj = substr($obj, 1);
      $obj = substr($obj, 0, strlen($obj) - 1);
      $this->entityName = trim($lib->exportInLine($obj, "entityName=", "id="));
      $this->id = trim($lib->exportInLine($obj, "id=", "zone="));
      $this->zone = trim($lib->exportInLine($obj, "zone=", "zonePos="));
      $this->zonePos = trim($lib->exportInLine($obj, "zonePos=", "cardId="));
      $this->cardId = trim($lib->exportInLine($obj, "cardId=", "player="));
      $this->player = trim($lib->exportInLine($obj, "player="));
      //$this->tags = $this->exportInLine($obj, "tags=");
    } else {
      $this->entityName = trim($lib->exportInLine($obj, "entityName=", "zone="));
      $this->zone = trim($lib->exportInLine($obj, "zone=", "zonePos="));
      $this->zonePos = trim($lib->exportInLine($obj, "zonePos=", "cardId="));
      $this->cardId = trim($lib->exportInLine($obj, "cardId=", "player="));
      $this->player = trim($lib->exportInLine($obj, "player=", "tags="));
      $this->tags = $this->tagsToArray(trim($lib->exportInLine($obj, "tags=")));
    }
    $this->entity_id = null;
  }

  private function tagsToArray($_tags) {
    $_tags = str_replace(["{", "}"], "", $_tags);
    $arr = explode(",", $_tags);
    $result = array();
    foreach ($arr as $key => $el) {
      $arr[$key] = explode(":", $el);
      $result[$arr[$key][0]] = isset($arr[$key][1]) ? $arr[$key][1] : null;
    }
    return $result;
  }
}
?>