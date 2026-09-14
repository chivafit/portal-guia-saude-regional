package br.com.guiasaude.portal;

import android.os.Bundle;
import android.view.View;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Android 16's emulator can leave stale GPU tiles while scrolling long,
        // shadow-heavy pages. A software WebView layer keeps every card painted
        // in its actual document position and avoids duplicated text/card trails.
        getBridge().getWebView().setLayerType(View.LAYER_TYPE_SOFTWARE, null);
    }
}
