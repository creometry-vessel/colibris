package com.esprit.go_recycle;

import androidx.annotation.NonNull;
import androidx.appcompat.app.ActionBarDrawerToggle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.core.view.GravityCompat;
import androidx.drawerlayout.widget.DrawerLayout;
import androidx.fragment.app.Fragment;

import android.content.Intent;
import android.content.SharedPreferences;
import android.content.res.Configuration;
import android.os.Bundle;
import android.view.Gravity;
import android.view.MenuItem;
import android.widget.Toast;

import com.google.android.material.bottomnavigation.BottomNavigationView;
import com.google.android.material.navigation.NavigationView;

public class AccueilRamasseur extends AppCompatActivity implements NavigationView.OnNavigationItemSelectedListener

    {
        private DrawerLayout mdrawer;
        private Toolbar mtog;
        private NavigationView sidenav;
        private ActionBarDrawerToggle toggle;
        @Override
        protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_accueil_ramasseur);


        mdrawer = findViewById(R.id.drawer);
        sidenav = findViewById(R.id.sidenavig);
        mtog = findViewById(R.id.toolbar);

        setSupportActionBar(mtog);
            SharedPreferences prefs = getSharedPreferences("IdUser",
                    MODE_PRIVATE);
            final String string = prefs.getString("idramasseur", null);
            Toast.makeText(getApplicationContext(), "Welcome monsieur  :" +string, Toast.LENGTH_LONG).show();

        toggle = new ActionBarDrawerToggle(this, mdrawer, mtog, R.string.open, R.string.close);
        mdrawer.addDrawerListener(toggle);
        toggle.syncState();
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);


        sidenav.setNavigationItemSelectedListener(this);





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
            case R.id.itemmap:
                Intent i = new Intent(AccueilRamasseur.this, MapsActivity.class);
                Toast.makeText(getApplicationContext(), "donnation", Toast.LENGTH_SHORT).show();
                startActivity(i);
                break;
            case R.id.itemcalender:
                Intent ii = new Intent(AccueilRamasseur.this, PlaningRamasseur.class);
                Toast.makeText(getApplicationContext(), "donnation", Toast.LENGTH_SHORT).show();
                startActivity(ii);
                break;
            case R.id.itemprofilr:
                Intent i2 = new Intent(AccueilRamasseur.this, RamasseurProfil.class);
                Toast.makeText(getApplicationContext(), "profil", Toast.LENGTH_SHORT).show();
                startActivity(i2);
                break;

            case R.id.itemdeconn:
                Intent intent = new Intent(AccueilRamasseur.this, login.class)
                        .setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
                SharedPreferences prefs = getSharedPreferences("IdUser",
                        MODE_PRIVATE);
                SharedPreferences.Editor prefEditor = prefs.edit();
                prefEditor.remove("idramasseur");
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