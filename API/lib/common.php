<?php
namespace BGParser;
class Common {
  public static function exportInLine($line, $token1, $token2 = null) {
    try {
      if ($token2 == null) {
        return substr($line, strpos($line, $token1) + strlen($token1), strlen($line) - strpos($line, $token1) - strlen($token1));
      } else {
        return substr($line, strpos($line, $token1) + strlen($token1), strpos($line, $token2) - (strpos($line, $token1) + strlen($token1)));
      }
    } catch (Exception $ex) {
      return $ex->getMessage();
    }
  }
}
?>