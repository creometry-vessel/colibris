package com.esprit.go_recycle;

import androidx.annotation.NonNull;
import androidx.appcompat.app.ActionBarDrawerToggle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.core.view.GravityCompat;
import androidx.drawerlayout.widget.DrawerLayout;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

import android.app.Activity;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.res.Configuration;
import android.os.Bundle;
import android.util.Log;
import android.view.Gravity;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.esprit.go_recycle.classes.APIClient;
import com.esprit.go_recycle.dao.IDonnation;
import com.esprit.go_recycle.dao.IUser;
import com.esprit.go_recycle.models.solde;
import com.google.android.material.navigation.NavigationView;
import com.google.zxing.integration.android.IntentIntegrator;
import com.google.zxing.integration.android.IntentResult;

public class AccueilSponsor extends AppCompatActivity implements NavigationView.OnNavigationItemSelectedListener{
    private DrawerLayout mdrawer;
    private Toolbar mtog;
    private NavigationView sidenav;
    private ActionBarDrawerToggle toggle;
    EditText points;
    Button transferer;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_accueil_sponsor);
        mdrawer = findViewById(R.id.drawer);
        sidenav = findViewById(R.id.sidenavig);
        mtog = findViewById(R.id.toolbar);
        transferer = findViewById(R.id.transferer);
        points = findViewById(R.id.points);

        setSupportActionBar(mtog);
        SharedPreferences prefs = getSharedPreferences("IdUser",
                MODE_PRIVATE);
        final String string = prefs.getString("id_sponsor", null);
        Toast.makeText(getApplicationContext(), "Welcome " , Toast.LENGTH_LONG).show();

        toggle = new ActionBarDrawerToggle(this, mdrawer, mtog, R.string.open, R.string.close);
        mdrawer.addDrawerListener(toggle);
        toggle.syncState();
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);


        sidenav.setNavigationItemSelectedListener(this);
        final Activity activity = this;
        transferer.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                IntentIntegrator integrator = new IntentIntegrator(activity);
                integrator.setDesiredBarcodeFormats(IntentIntegrator.QR_CODE);
                integrator.setPrompt("Scan");
                integrator.setCameraId(0);
                integrator.setBeepEnabled(false);
                integrator.setBarcodeImageEnabled(false);
                integrator.initiateScan();
            }
        });
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        IntentResult result = IntentIntegrator.parseActivityResult(requestCode, resultCode, data);
        if(result != null){
            if(result.getContents()==null){
                Toast.makeText(this, "You cancelled the scanning", Toast.LENGTH_LONG).show();
            }
            else {
                Toast.makeText(this, "Le solde a etait modifié",Toast.LENGTH_LONG).show();
                String s=result.getContents();
                Log.v("the id-useris","idscannned"+s);
                SharedPreferences prefs = getSharedPreferences("IdUser",
                        MODE_PRIVATE);
                final String string = prefs.getString("id_sponsor", null);
                IUser IUser = APIClient.getClient().create(IUser.class);
                IUser.trans(Integer.parseInt(s), Integer.parseInt(points.getText().toString()),Integer.parseInt(string)).enqueue(new Callback<solde>() {
                    @Override
                    public void onResponse(Call<solde> call, Response<solde> response) {
                        Log.v("successssssssssssssssss", response.body().toString());
                        

                    }

                    @Override
                    public void onFailure(Call<solde> call, Throwable t) {
                        Log.e("failure", t.getLocalizedMessage());
                    }
                });

            }
        }
        else {
            super.onActivityResult(requestCode, resultCode, data);
        }
    }


    @Override
    public void onBackPressed () {
        if (mdrawer.isDrawerOpen(Gravity.RIGHT)) {
            mdrawer.closeDrawer(Gravity.LEFT);
        } else {
            super.onBackPressed();
        }

    }
    @Override
    protected void onPostCreate (Bundle savedInstanceState){
        super.onPostCreate(savedInstanceState);
        if (mdrawer != null) {
            toggle.syncState();
        }
    }
    @Override
    public void onConfigurationChanged (Configuration newConfig){
        super.onConfigurationChanged(newConfig);
        if (mdrawer != null) {
            // Pass any configuration change to the drawer toggles
            toggle.onConfigurationChanged(newConfig);
        }
    }


    @Override
    public boolean onNavigationItemSelected (@NonNull MenuItem item){
        String ff = getIntent().getStringExtra("data");
        switch (item.getItemId()) {



            case R.id.deco:
                Intent intent = new Intent(AccueilSponsor.this, login.class)
                        .setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
                SharedPreferences prefs = getSharedPreferences("IdUser",
                        MODE_PRIVATE);
                SharedPreferences.Editor prefEditor = prefs.edit();
                prefEditor.remove("id_sponsor");
                prefEditor.clear();
                prefEditor.commit();
                finish();
                intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK);
                startActivity(intent);

                break;
        }
        mdrawer.closeDrawer(GravityCompat.START);

        return true;
    }
}
