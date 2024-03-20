package dk.nyttebjerggaard.chickenreport;

import android.content.pm.PackageManager;
import android.os.Bundle;
import android.Manifest;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
  int MY_PERMISSIONS_REQUEST_READ_EXTERNAL_STORAGE = 12342123;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    if (checkSelfPermission(Manifest.permission.WRITE_EXTERNAL_STORAGE)
      != PackageManager.PERMISSION_GRANTED) {

      // Should we show an explanation?
      if (shouldShowRequestPermissionRationale(
        Manifest.permission.WRITE_EXTERNAL_STORAGE)) {
        // Explain to the user why we need to read the contacts
      }

      requestPermissions(new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE},
        MY_PERMISSIONS_REQUEST_READ_EXTERNAL_STORAGE);

      // MY_PERMISSIONS_REQUEST_READ_EXTERNAL_STORAGE is an
      // app-defined int constant that should be quite unique
    }
    super.onCreate(savedInstanceState);
  }
}
