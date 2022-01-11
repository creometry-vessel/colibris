package com.esprit.go_recycle;

import androidx.annotation.NonNull;
import androidx.appcompat.app.ActionBarDrawerToggle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.core.view.GravityCompat;
import androidx.drawerlayout.widget.DrawerLayout;
import androidx.fragment.app.Fragment;
import androidx.navigation.NavController;
import androidx.navigation.Navigation;

import android.content.Intent;
import android.content.SharedPreferences;
import android.content.res.Configuration;
import android.os.Bundle;
import android.view.Gravity;
import android.view.MenuItem;
import android.widget.Toast;

import com.google.android.material.bottomnavigation.BottomNavigationView;
import com.google.android.material.navigation.NavigationView;

public class AccueilDonneur extends AppCompatActivity implements NavigationView.OnNavigationItemSelectedListener {
private DrawerLayout mdrawer;
private Toolbar mtog;
private NavigationView sidenav;
private ActionBarDrawerToggle toggle;
private SharedPreferences mPreferences;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_accueil_donneur);
        mdrawer=findViewById(R.id.drawer);
        sidenav=findViewById(R.id.sidenavig);
        mtog=findViewById(R.id.toolbar);
          String  ff=getIntent().getStringExtra("data");
        setSupportActionBar(mtog);


         toggle =new ActionBarDrawerToggle(this,mdrawer,mtog,R.string.open,R.string.close);
         mdrawer.addDrawerListener(toggle);
         toggle.syncState();
getSupportActionBar().setDisplayHomeAsUpEnabled(true);


sidenav.setNavigationItemSelectedListener(this);


        BottomNavigationView btnNav=findViewById(R.id.bottomnavigation);
        btnNav.setOnNavigationItemSelectedListener(navlistener);

     getSupportFragmentManager().beginTransaction().replace(R.id.fragment,new HomeFragment()).commit();


    }

    @Override
    public void onBackPressed() {
        if(mdrawer.isDrawerOpen(Gravity.RIGHT)){
            mdrawer.closeDrawer(Gravity.LEFT);}
        else { super.onBackPressed();
        }

        }
    @Override
    protected void onPostCreate(Bundle savedInstanceState) {
        super.onPostCreate(savedInstanceState);
        if (mdrawer != null) {
            toggle.syncState();
        }
    }
    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        if (mdrawer != null) {
            // Pass any configuration change to the drawer toggles
            toggle.onConfigurationChanged(newConfig);
        }
    }

    private BottomNavigationView.OnNavigationItemSelectedListener navlistener=new BottomNavigationView.OnNavigationItemSelectedListener() {
        @Override
        public boolean onNavigationItemSelected(@NonNull MenuItem item) {
            Fragment selectedFragment = null;
            switch (item.getItemId()){
                case R.id.itemhome:
                    selectedFragment=new HomeFragment();
                    break;
                case R.id.itempanier:
                    selectedFragment=new PanierFragment();
                    break;

            }
            getSupportFragmentManager().beginTransaction().replace(R.id.fragment,selectedFragment).commit();
            return true;
        }
    };

    @Override
    public boolean onNavigationItemSelected(@NonNull MenuItem item) {
        String  ff=getIntent().getStringExtra("data");
        switch (item .getItemId())
        { case R.id.itemhome:
            break;
            case R.id.itemlist:
                Intent i = new Intent(AccueilDonneur.this, Listdonnation.class);
                Toast.makeText(getApplicationContext(), "donnation", Toast.LENGTH_SHORT).show();
                startActivity(i);
                break;
            case R.id.itemevenement:
                Intent i1 = new Intent(AccueilDonneur.this, ListEvenement.class);
                Toast.makeText(getApplicationContext(), "evenemnt"+ff, Toast.LENGTH_SHORT).show();
                i1.putExtra("data",ff);
                startActivity(i1);
                break;
            case R.id.itemprofile:
                Intent i2 = new Intent(AccueilDonneur.this, Profildonneur.class);
                Toast.makeText(getApplicationContext(), "profil", Toast.LENGTH_SHORT).show();
                startActivity(i2);
                break;

            case R.id.itemcode:
                Intent i4 = new Intent(AccueilDonneur.this, qrcode.class);
                Toast.makeText(getApplicationContext(), "Qrcode", Toast.LENGTH_SHORT).show();
                startActivity(i4);
                break;
            case R.id.itemscore:
                Intent i5 = new Intent(AccueilDonneur.this, Score.class);
                Toast.makeText(getApplicationContext(), "Qrcode", Toast.LENGTH_SHORT).show();
                startActivity(i5);
                break;
            case R.id.itemsponsor:
                Intent i6 = new Intent(AccueilDonneur.this, ListSponsor.class);
                Toast.makeText(getApplicationContext(), "Qrcode", Toast.LENGTH_SHORT).show();
                startActivity(i6);
                break;
            case R.id.itemlogout:
                Intent intent = new Intent(AccueilDonneur.this, login.class)
                        .setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
                SharedPreferences prefs = getSharedPreferences("IdUser",
                        MODE_PRIVATE);
                SharedPreferences.Editor prefEditor = prefs.edit();
                prefEditor.remove("Key");
                prefEditor.remove("lib");
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