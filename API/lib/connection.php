<?
include './env/env.php';
header('Set-Cookie: fileDownload=true');
header('Pragma: no-cache');

session_cache_limiter('');
session_cache_expire(1440);
session_start();

function DBOpen () {
  $serverName = ENV_DB_HOST;
	$connectionInfo = array(
		'Database'=>ENV_DB_NAME
		, 'UID'=>ENV_DB_USER_NAME
		, 'PWD'=>ENV_DB_USER_PWD
		, 'CharacterSet'=>'UTF-8'
		, 'ReturnDatesAsStrings'=>true
	);
	
  $conn = mysqli_connect(ENV_DB_HOST, ENV_DB_USER_NAME, ENV_DB_USER_PWD, ENV_DB_NAME, ENV_DB_PORT);
  $GLOBALS['DBconn'] = $conn;

  if ($conn == false) {
    $GLOBALS['DBconnResult'] = 'Failure - '.mysqli_connect_error();
  } else {
    $GLOBALS['DBconnResult'] = 'Success';
  }
}

function DBClose () {
	mysqli_close($GLOBALS['DBconn']);
}

function RSOpen ($sql) {
  $return = null;
  do {
    // store first result set
    if ($result = mysqli_store_result($GLOBALS['DBconn'])) {
      $return = $result;
      /*
      // fetch one and one row
      while ($row = mysqli_fetch_row($result)) {
        printf('%s\n',$row[0]);
      }
      */
      // free result set
      mysqli_free_result($result);
    }
  } while (mysqli_more_results($GLOBALS['DBconn']) && mysqli_next_result($GLOBALS['DBconn']));

  if( ($errors = mysqli_error($GLOBALS['DBconn']) ) != null) {
		echo $errors;
    exit;
  }
  return $result;
}

function RSClose ($result) {
	if (!is_resource($result)) {
		return false;
  }
  return mysqli_stmt_close($result);
}
?>