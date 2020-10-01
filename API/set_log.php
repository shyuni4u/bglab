<?
include './lib/connection.php';
include './lib/parser.php';
header('Content-Type: application/json; charset=UTF-8');

use BGParser\Parser;

// json check
if(!in_array('application/json',explode(';',$_SERVER['CONTENT_TYPE']))){
  echo json_encode(array('result_code' => '400'));
  exit;
}

DBOpen();

$method = $_SERVER['REQUEST_METHOD'];
$conn = $GLOBALS['DBconn'];

if ($method == 'POST') {
  $result_json = trim(file_get_contents("php://input"));
  $_POST = json_decode($result_json, true);
  
  if ($_POST['Version'] == "1.1.0") {
    $parser = new Parser();

    foreach($_POST['PowerLog'] as $idx => $cmd) {
      $parser->parseCommand($cmd, $idx);
      //print_r($parser->parseCommand($cmd, $idx));
    }

    if ($parser->user_player_id != "" && $parser->user_hero_id != "") {
      try {
        $player_name  = $parser->user_player_id;
        $hero_id      = $parser->user_hero_id;
        $placement    = $parser->user_placement;
        $turn_count   = $parser->user_turn_count;

        $bob_board    = $parser->getBobBoard();
        $action_board = $parser->getActionBoard();
        $enemy_board  = $parser->getEnemyBoard();
        $my_board     = $parser->getMyBoard();
        
        $conn->autocommit(FALSE);
        // player_id
        $sql = 'SELECT BGLAB.fn_get_player_id (?) AS player_id;';
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('s', $player_name);
        $stmt->execute();
        $result = $stmt->get_result();
        $player_id = $result->fetch_array(MYSQLI_NUM)[0];
        
        // game_id
        $sql = 'INSERT INTO game (player_id, hero, placement, hs_version, mmr, turn_count, dt_now)';
        $sql .= ' VALUES (?, ?, ?, ?, ?, ?, NOW());';
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('isisii', $player_id, $hero_id, $placement, $_POST['Version'], $_POST['MMR'], $turn_count);
        $stmt->execute();
        $game_id = $conn->insert_id;

        //  my : turn_board
        $sql = "INSERT INTO turn_board (game_id, card_id, card_name, card_type, card_order, turn, idx, health, atk, etc)";
        $sql .= " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
        $stmt = $conn->prepare($sql);

        foreach ($my_board as $board) {
          foreach ($board as $order => $card) {
            $etc = "";
            $etc .= ((isset($card->tags["DIVINE_SHIELD"]) ? $card->tags["DIVINE_SHIELD"]  : 0) == 0) ? "" : "divine ";
            $etc .= ((isset($card->tags["REBORN"])        ? $card->tags["REBORN"]         : 0) == 0) ? "" : "reborn ";
            $etc .= ((isset($card->tags["DEATHRATTLE"])   ? $card->tags["DEATHRATTLE"]    : 0) == 0) ? "" : "deathrattle ";
            $etc .= ((isset($card->tags["TAUNT"])         ? $card->tags["TAUNT"]          : 0) == 0) ? "" : "taunt ";
            $etc .= ((isset($card->tags["POISONOUS"])     ? $card->tags["POISONOUS"]      : 0) == 0) ? "" : "poisonous ";

            $card_type    = (isset($card->tags["CARDTYPE"]) ? $card->tags["CARDTYPE"] : 0);
            $atk          = (isset($card->tags["ATK"])      ? $card->tags["ATK"]      : 0);
            $health       = (isset($card->tags["HEALTH"])   ? $card->tags["HEALTH"]   : 0);
            
            $stmt->bind_param("isssiiiiis", $game_id, $card->cardId, $card->entityName, $card_type, $order, $card->turn, $card->idx, $health, $atk, $etc);
            $stmt->execute();
          }
        }

        // last board
        $last_board = end($my_board);

        $sql = "INSERT INTO last_board (game_id, card_id, card_name, card_type, card_order, turn, idx, health, atk, etc)";
        $sql .= " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
        $stmt = $conn->prepare($sql);

        foreach ($last_board as $order => $card) {
          $etc = "";
          $etc .= ((isset($card->tags["DIVINE_SHIELD"]) ? $card->tags["DIVINE_SHIELD"]  : 0) == 0) ? "" : "divine ";
          $etc .= ((isset($card->tags["REBORN"])        ? $card->tags["REBORN"]         : 0) == 0) ? "" : "reborn ";
          $etc .= ((isset($card->tags["DEATHRATTLE"])   ? $card->tags["DEATHRATTLE"]    : 0) == 0) ? "" : "deathrattle ";
          $etc .= ((isset($card->tags["TAUNT"])         ? $card->tags["TAUNT"]          : 0) == 0) ? "" : "taunt ";
          $etc .= ((isset($card->tags["POISONOUS"])     ? $card->tags["POISONOUS"]      : 0) == 0) ? "" : "poisonous ";

          $card_type    = (isset($card->tags["CARDTYPE"]) ? $card->tags["CARDTYPE"] : 0);
          $atk          = (isset($card->tags["ATK"])      ? $card->tags["ATK"]      : 0);
          $health       = (isset($card->tags["HEALTH"])   ? $card->tags["HEALTH"]   : 0);

          $stmt->bind_param("isssiiiiis", $game_id, $card->cardId, $card->entityName, $card_type, $order, $card->turn, $card->idx, $health, $atk, $etc);
          $stmt->execute();
        }

        //  bob : bob_board
        $sql = "INSERT INTO bob_board (game_id, card_id, card_name, card_type, card_order, turn, idx, health, atk, etc)";
        $sql .= " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
        $stmt = $conn->prepare($sql);

        foreach ($bob_board as $board) {
          foreach ($board as $order => $card) {
            $etc = "";
            $etc .= ((isset($card->tags['DIVINE_SHIELD']) ? $card->tags['DIVINE_SHIELD']  : 0) == 0) ? "" : "divine ";
            $etc .= ((isset($card->tags['REBORN'])        ? $card->tags['REBORN']         : 0) == 0) ? "" : "reborn ";
            $etc .= ((isset($card->tags['DEATHRATTLE'])   ? $card->tags['DEATHRATTLE']    : 0) == 0) ? "" : "deathrattle ";
            $etc .= ((isset($card->tags['TAUNT'])         ? $card->tags['TAUNT']          : 0) == 0) ? "" : "taunt ";
            $etc .= ((isset($card->tags['POISONOUS'])     ? $card->tags['POISONOUS']      : 0) == 0) ? "" : "poisonous ";

            $card_type    = (isset($card->tags['CARDTYPE']) ? $card->tags['CARDTYPE'] : 0);
            $atk          = (isset($card->tags['ATK']) ? $card->tags['ATK'] : 0);
            $health       = (isset($card->tags['HEALTH']) ? $card->tags['HEALTH'] : 0);

            $stmt->bind_param("isssiiiiis", $game_id, $card->cardId, $card->entityName, $card_type, $order, $card->turn, $card->idx, $health, $atk, $etc);
            $stmt->execute();
          }
        }

        //  enemy : enemy_board
        $sql = "INSERT INTO enemy_board (game_id, card_id, card_name, card_type, card_order, turn, idx, health, atk, etc)";
        $sql .= " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
        $stmt = $conn->prepare($sql);

        foreach ($enemy_board as $board) {
          foreach ($board as $order => $card) {
            $etc = "";
            $etc .= ((isset($card->tags['DIVINE_SHIELD']) ? $card->tags['DIVINE_SHIELD']  : 0) == 0) ? "" : "divine ";
            $etc .= ((isset($card->tags['REBORN'])        ? $card->tags['REBORN']         : 0) == 0) ? "" : "reborn ";
            $etc .= ((isset($card->tags['DEATHRATTLE'])   ? $card->tags['DEATHRATTLE']    : 0) == 0) ? "" : "deathrattle ";
            $etc .= ((isset($card->tags['TAUNT'])         ? $card->tags['TAUNT']          : 0) == 0) ? "" : "taunt ";
            $etc .= ((isset($card->tags['POISONOUS'])     ? $card->tags['POISONOUS']      : 0) == 0) ? "" : "poisonous ";

            $card_type    = (isset($card->tags['CARDTYPE']) ? $card->tags['CARDTYPE'] : 0);
            $atk          = (isset($card->tags['ATK']) ? $card->tags['ATK'] : 0);
            $health       = (isset($card->tags['HEALTH']) ? $card->tags['HEALTH'] : 0);

            $stmt->bind_param("isssiiiiis", $game_id, $card->cardId, $card->entityName, $card_type, $order, $card->turn, $card->idx, $health, $atk, $etc);
            $stmt->execute();
          }
        }

        //  action : action_board
        $sql = "INSERT INTO action_board (game_id, action_type, action_value, card_id, card_name, card_type, card_order, turn, idx, health, atk, etc)";
        $sql .= " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
        $stmt = $conn->prepare($sql);

        foreach ($action_board as $order => $card) {
          $etc = "";
          $etc .= ((isset($card->tags['DIVINE_SHIELD']) ? $card->tags['DIVINE_SHIELD']  : 0) == 0) ? "" : "divine ";
          $etc .= ((isset($card->tags['REBORN'])        ? $card->tags['REBORN']         : 0) == 0) ? "" : "reborn ";
          $etc .= ((isset($card->tags['DEATHRATTLE'])   ? $card->tags['DEATHRATTLE']    : 0) == 0) ? "" : "deathrattle ";
          $etc .= ((isset($card->tags['TAUNT'])         ? $card->tags['TAUNT']          : 0) == 0) ? "" : "taunt ";
          $etc .= ((isset($card->tags['POISONOUS'])     ? $card->tags['POISONOUS']      : 0) == 0) ? "" : "poisonous ";

          $card_type    = (isset($card->tags['CARDTYPE']) ? $card->tags['CARDTYPE'] : 0);
          $atk          = (isset($card->tags['ATK']) ? $card->tags['ATK'] : 0);
          $health       = (isset($card->tags['HEALTH']) ? $card->tags['HEALTH'] : 0);

          $stmt->bind_param("isssssiiiiis", $game_id, $card->action, $card->action_value, $card->cardId, $card->entityName, $card_type, $order, $card->turn, $card->idx, $health, $atk, $etc);
          $stmt->execute();
        }
        
        //echo "game_id, card_order=$order, turn=$card->turn, card_id=$card->cardId, card_name=$card->entityName, card_type=$card_type";
        //echo ", idx=$card->idx, atk=$atk, health=$health, etc=$etc";
        //print_r("<br/>");

        $conn->commit();
        echo json_encode(array('result_code' => '200'));
      } catch (Exception $ex) {
        print_r($ex);
        $conn->rollBack();
      }
    }
  } else {
    try {
      $conn->autocommit(FALSE);
      /*
      $check_result = json_encode($result_json);
      // check_table
      $sql = 'INSERT INTO check_table (check_param, check_time)';
      $sql .= ' VALUES (?, NOW());';
      $stmt = $conn->prepare($sql);
      $stmt->bind_param('s', $check_result);
      $stmt->execute();
      */
      // player_id
      $sql = 'SELECT BGLAB.fn_get_player_id (?) AS player_id;';
      $stmt = $conn->prepare($sql);
      $stmt->bind_param('s', $_POST['PlayerID']);
      $stmt->execute();
      $result = $stmt->get_result();
      $player_id = $result->fetch_array(MYSQLI_NUM)[0];
      
      // game_id
      $sql = 'INSERT INTO game (player_id, hero, placement, hs_version, mmr, turn_count, dt_now)';
      $sql .= ' VALUES (?, ?, ?, ?, ?, ?, NOW());';
      $stmt = $conn->prepare($sql);
      $stmt->bind_param('isisii', $player_id, $_POST['HeroID'], $_POST['Placement'], $_POST['Version'], $_POST['MMR'], $_POST['TurnCount']);
      $stmt->execute();
      $game_id = $conn->insert_id;
      
      // last board
      $sql = 'INSERT INTO last_board (game_id, card_id, card_name, card_order)';
      $sql .= ' VALUES (?, ?, ?, ?);';
      $stmt = $conn->prepare($sql);
      foreach ($_POST['LeaderBoard'] as $idx => $el) {
        $pieces = explode('@#', $el);
        $n = 0;
        $card_id = $pieces[$n++];
        $card_name = $pieces[$n++];
        //$card_type = $pieces[$n++];
        //$card_attack = $pieces[$n++];
        //$card_health = $pieces[$n++];
        $stmt->bind_param('issi', $game_id, $card_id, $card_name, $idx);
        $stmt->execute();
      }
      
      // turn board
      $sql = 'INSERT INTO turn_board (game_id, card_id, card_name, card_type, card_order, turn)';
      $sql .= ' VALUES (?, ?, ?, ?, ?, ?);';
      $stmt = $conn->prepare($sql);
      $idx = 0;
      $prev_turn = 0;
      foreach ($_POST['TurnBoard'] as $el) {
        $pieces = explode('@#', $el);
        $n = 0;
        $turn = $pieces[$n++];
        $card_id = $pieces[$n++];
        if ($turn != $prev_turn) $idx = 0;
        $card_name = $pieces[$n++];
        $card_type = $pieces[$n++];
        //$card_attack = $pieces[$n++];
        //$card_health = $pieces[$n++];
        $stmt->bind_param('isssii', $game_id, $card_id, $card_name, $card_type, $idx, $turn);
        $stmt->execute();
        $prev_turn = $turn;
        $idx++;
      }
      
      // used card
      $sql = 'INSERT INTO used_card (game_id, card_id, card_name, card_type, card_order, turn)';
      $sql .= ' VALUES (?, ?, ?, ?, ?, ?);';
      $stmt = $conn->prepare($sql);
      $idx = 0;
      $prev_turn = 0;
      $prev_level = 'Tavern Tier 2';
      foreach ($_POST['UsedCard'] as $el) {
        $pieces = explode('@#', $el);
        $n = 0;
        $turn = $pieces[$n++];
        $card_id = $pieces[$n++];
        if ($turn != $prev_turn) $idx = 0;
        $card_name = $pieces[$n++];
        $card_type = $pieces[$n++];
        if ($card_type == 'Game_Mode_Button') {
          if (preg_match('/\bTavern Tier\b/', $card_name) && $card_name != $prev_level) {
            $prev_level = $card_name;
          } else {
            continue;
          }
        }
        //$card_attack = $pieces[$n++];
        //$card_health = $pieces[$n++];
        $stmt->bind_param('isssii', $game_id, $card_id, $card_name, $card_type, $idx, $turn);
        $stmt->execute();
        $prev_turn = $turn;
        $idx++;
      }
      
      $conn->commit();
      echo json_encode(array('result_code' => '200'));
    } catch (Exception $ex) {
      print_r($ex);
      $conn->rollBack();
    }
  }
} else {
  echo json_encode(array('result_code' => '400'));
}

DBClose();
?>