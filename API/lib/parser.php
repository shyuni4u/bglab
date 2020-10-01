<?php
namespace BGParser;
require_once __DIR__ . "/../enum/Card.php";
require_once __DIR__ . "/../lib/common.php";

class Parser {
  const COMMAND_TOKEN = "@#";

  public $user_player_id = null;
  public $user_hero_id = null;
  public $user_placement = null;
  public $user_turn_count = null;

  //  me
  private $player_id = 0;

  //  calc base info from log info
  private $mode = 0;
  private $idx_col = 0;

  //  info from log
  private $turn_count = 0;
  private $opponent_type = 0;
  private $damage = 0;
  private $position_state = true;
  private $freeze_state = true;

  private $bob_board;
  private $my_board;
  private $enemy_board;
  private $action_board;

  private $lib;

  public function __construct() {
    $this->lib = new Common();
    $this->bob_board = array();
    $this->my_board = array();
    $this->enemy_board = array();
    $this->action_board = array();
  }

  //  private
  private function insertBoard($card, $action = null) {
    $mode_count = floor($this->mode / 2);
    $mode_type = $this->mode % 2;           //  1: recruit, 0: battle
    $mode_count += $mode_type;              //  real turn

    if ($action != null) {
      //  insert action board
      if (is_array($this->action_board)) {
        $card->turn = $mode_count;
        $card->idx = $this->idx_col;
        $card->action = $action;
        array_push($this->action_board, $card);
      }
    } else {
      //  insert bob board
      if ($mode_type == 1 && $card->zone == "PLAY") {
        if (isset($this->bob_board[count($this->bob_board) - 1]) && is_array($this->bob_board[count($this->bob_board) - 1])) {
          $card->turn = $mode_count;
          $card->idx = $this->idx_col;
          array_push($this->bob_board[count($this->bob_board) - 1], $card);
        }
      }
      //  insert my board
      else if ($mode_type == 0 && $card->zone == "SETASIDE" && $this->idx_col == 1 && $this->position_state) {
        if (isset($this->my_board[count($this->my_board) - 1]) && is_array($this->my_board[count($this->my_board) - 1])) {
          $card->turn = $mode_count;
          $card->idx = $this->idx_col;
          array_push($this->my_board[count($this->my_board) - 1], $card);
        }
      }
      //  insert enemy board
      else if ($mode_type == 0 && $card->zone == "PLAY" && $this->idx_col == 0) {
        if (isset($this->enemy_board[count($this->enemy_board) - 1]) && is_array($this->enemy_board[count($this->enemy_board) - 1])) {
          $card->turn = $mode_count;
          $card->idx = $this->idx_col;
          array_push($this->enemy_board[count($this->enemy_board) - 1], $card);
        }
      }
    }
  }
  private function updateBoard($card, $tag, $value) {
    $mode_count = floor($this->mode / 2);
    $mode_type = $this->mode % 2;           //  1: recruit, 0: battle
    $mode_count += $mode_type;              //  real turn

    //  update enemy board
    if ($mode_type == 0 && $card->zone == "PLAY") {
      if (isset($this->enemy_board[count($this->enemy_board) - 1][$card->zonePos - 1])) {
        $t_card = $this->enemy_board[count($this->enemy_board) - 1][$card->zonePos - 1];
        if ($card->cardId == $t_card->cardId
          && $card->zonePos == $t_card->zonePos
          && $card->player == $t_card->player
          && $this->idx_col == $t_card->idx) {
          $this->enemy_board[count($this->enemy_board) - 1][$card->zonePos - 1]->tags[$tag] = $value;
        }
      }
    }
    //  update my board
    else if ($mode_type == 0 && $card->zone == "SETASIDE") {
      if (isset($this->my_board[count($this->my_board) - 1])) {
        foreach ($this->my_board[count($this->my_board) - 1] as $idx => $t_card) {
          if ($t_card->tags["ENTITY_ID"] == $card->id) {
            $this->my_board[count($this->my_board) - 1][$idx]->tags[$tag] = $value;
            break;
          }
        }
      }
    }
  }

  //  public
  public function parseCommand($cmd, $no_row = null) {
    $lib = $this->lib;
    $player_id = $this->player_id;
    $turn_count = $this->turn_count;
    //$turn_type = $this->turn_count % 2;
    $opponent_type = $this->opponent_type;

    $mode_count = floor($this->mode / 2);
    $mode_type = $this->mode % 2;           //  1: recruit, 0: battle
    $mode_count += $mode_type;              //  real turn
    
    $command = explode(self::COMMAND_TOKEN, $cmd);

    $type = $command[0];
    $content = $command[1];
    $result = "";

    if ($this->player_id == 0 && strpos($type, "TAG_TYPE") > -1) {
      $header = explode("=", $type);
      $tag = trim($header[1]);

      $body = explode("TARGET=", $content);
      $value = trim($body[0]);
      $entity = trim($body[1]);
      if ($tag == "PLAYER_ID") {
        $card = new Card($entity);
        $this->player_id = $value;
        $this->user_hero_id = $card->cardId;
      }
    } else {
      if ($type == "CARD") {

        $card = new Card($content);
        if (isset($card->tags["CARDTYPE"])) {
          $card_type = $card->tags["CARDTYPE"];
          $atk = isset($card->tags["ATK"]) ? $card->tags["ATK"] : 0;
          $health = isset($card->tags["HEALTH"]) ? $card->tags["HEALTH"] : 0;
          if ($card_type == "MINION") {
            $result .= "  - $card_type [$this->idx_col][$card->zone] $card->entityName ATK:$atk, HEALTH:$health";
            $this->insertBoard($card);
          } else if ($card_type == "HERO") {
            $result .= "  - $card_type [$this->idx_col][$card->zone] $card->entityName ATK:$atk, HEALTH:$health";

            if ($this->turn_count > 0) $this->insertBoard($card); //  insert enemy hero

            $this->idx_col++;
          }
          //else if ($card_type == "SPELL") {
          //  [deck] include [spell].
          //$this->insertBoard($card, "spell");
          //$result .= $card->entityName;
        }
  
      } else if ($type == "BLOCK_TYPE") {
  
        $header = explode(" TARGET=", $content);
        $block_type = trim($header[0]);
  
        if ($block_type == "PLAY") {
          $entity = trim($lib->exportInLine($content, "TARGET=", "EffectCardId="));
          $target = trim($lib->exportInLine($content, "Target=", "SubOption="));
          
          $e_card = new Card($entity);
          $t_card = new Card($target);
          if ($e_card->cardId == "TB_BaconShop_DragBuy") {
            $result = "  # Buy: ".$t_card->entityName;
            $this->insertBoard($t_card, "buy");
          } else if ($e_card->cardId == "TB_BaconShop_DragSell") {
            $result = "  # Sell: ".$t_card->entityName;
            $this->insertBoard($t_card, "sell");
          } else if ($e_card->cardId == "TB_BaconShop_8p_Reroll_Button") {
            $this->idx_col++;
            $result = "  # [RELOAD] by BlockType";
            array_push($this->bob_board, array());    //  make new bob board
          } else if ($e_card->zone == "HAND" && $e_card->player == $player_id) {
            $this->insertBoard($e_card, "deck");
            $result = "  # Hand to Deck: $e_card->entityName, zonePos: $e_card->zonePos";
          } else if ($e_card->zone == "PLAY" && $e_card->player == $player_id && strpos($e_card->cardId, "TB_BaconShop_HP_") > -1) {
            $this->insertBoard($e_card, "power");
            $result = "  # Hero Power: $e_card->entityName, zonePos: $e_card->zonePos";
          }
        } else if ($block_type == "POWER") {
          $entity = trim($lib->exportInLine($content, "TARGET=", "EffectCardId="));
          $target = trim($lib->exportInLine($content, "Target=", "SubOption="));
          
          $e_card = new Card($entity);
          if ($e_card->cardId == "TB_BaconShopLockAll_Button") {
            $f_state = $this->freeze_state ? "freeze" : "thaw";
            $this->freeze_state = !$this->freeze_state;
            $t_card = new Card("[entityName=빙결 id=0 zone=PLAY zonePos=0 cardId=TB_BaconShopLockAll_Button player=$player_id]");
            $result = "  # [FREEZE] - $f_state";
            $this->insertBoard($t_card, $f_state);
          }
        }
        
      } else if ($type == "SUB_SPELL") {
  
        if (strpos($content, "Bacon_MinionSwap_OverrideSpawnIn_Super") > -1) {
          $this->idx_col++;
          $result = "  # [RELOAD] by SubSpell";
          array_push($this->bob_board, array());    //  make new bob board
        }
  
      } else if (strpos($type, "TAG_TYPE") > -1) {
  
        $header = explode("=", $type);
        $tag = trim($header[1]);
  
        $body = explode("TARGET=", $content);
        $value = trim($body[0]);
        $entity = trim($body[1]);
  
        if ($entity == "GameEntity") {
          if ($tag == "NUM_TURNS_IN_PLAY") {
            $this->turn_count = intval($value);
            //$result = ($turn_type == 1 ? "Enemy" : "My")." Turn: $value";
          } else if ($tag == "BACON_COIN_ON_ENEMY_MINIONS") {
            $this->opponent_type = intval($value);
            $this->idx_col = 0;
            $this->mode++;
  
            $mode_count = floor($this->mode / 2);
            $mode_type = $this->mode % 2;           //  1: recruit, 0: battle
            $mode_count += $mode_type;              //  real turn
            $result = ($this->opponent_type == 0 ? "Battle" : "Recruit")." Info [Turn: $mode_count][Type: $mode_type] ============================================================================";
            if ($mode_type == 0) {
              $this->position_state = true;  //  init my_board position_state (divide init / battle start)
              $this->freeze_state = true;
              $this->damage = 0;        //  init battle result
              array_push($this->enemy_board, array());    //  make new enemy board
              array_push($this->my_board, array());    //  make new my board
            }
            $this->user_turn_count = $mode_count;
          } else if ($tag == "NEXT_STEP" && $value == "MAIN_START_TRIGGERS") {
            $this->position_state = false;
            //$result = "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++";
          }
        } else if ($tag == "ATK"
                || $tag == "HEALTH"
                || $tag == "REBORN"
                || $tag == "DIVINE_SHIELD"
                || $tag == "DEATHRATTLE"
                || $tag == "TAUNT"
                || $tag == "POISONOUS") {
          $card = new Card($entity);
          if ($card->zone == "PLAY" && $card->cardId != "" && $card->player != $player_id && $mode_type == 0) {
            //$result = " +++ [$card->entityName][$tag] $value";
            $this->updateBoard($card, $tag, $value);
          } else if ($card->zone == "SETASIDE" && $card->cardId != "" && $card->player == $player_id && $mode_type == 0) {
            //$result = " +++ [$card->entityName][$tag] $value";
            $this->updateBoard($card, $tag, $value);
          }
        } else if ($tag == "PREDAMAGE") {
          $card = new Card($entity);
          if (strpos($card->cardId, "TB_BaconShop_HERO") > -1 && $value != 0 && $this->damage != $value && $mode_type == 0) {
            $this->damage = $value;
            $value = ($card->player == $player_id) ? -1 * $value : $value;
            $card->action_value = $value;
            $this->insertBoard($card, "damaged");
            $result = " *** $card->entityName damaged $value";
          }
        } else if (strpos($entity, "#") > -1 && $this->user_player_id == null) {
          $this->user_player_id = $entity;
        } else if ($tag == "PLAYER_LEADERBOARD_PLACE") {
          $card = new Card($entity);
          //$result = $entity;
          if ($player_id == $card->player) {
            $this->user_placement = $value;
          }
        } else if ($tag == "PLAYER_TECH_LEVEL") {
          if (trim($entity) == $this->user_player_id) {
            $temp = "entityName=Lv UP id=0 zone=PLAY zonePos=0 cardId=TB_BaconShopTechUp0".($value + 1)."_Button player=".$this->user_player_id;
            $card = new Card($temp);
            $result = " *** Level UP: $value";
            
            $this->insertBoard($card, "lvlup");
          }
        }
  
      } else {
        $result = "ElseCommand";
      }
    }

    return ($result == "") ? "" : "[".($no_row + 5)."]$result<br/>";
  }

  public function getBobBoard() {
    return $this->bob_board;
  }

  public function getMyBoard() {
    return $this->my_board;
  }

  public function getEnemyBoard() {
    return $this->enemy_board;
  }

  public function getActionBoard() {
    return $this->action_board;
  }
}
?>