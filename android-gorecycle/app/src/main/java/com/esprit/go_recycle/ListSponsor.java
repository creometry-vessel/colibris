package com.esprit.go_recycle;

import androidx.annotation.NonNull;
import androidx.appcompat.app.ActionBarDrawerToggle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.core.view.GravityCompat;
import androidx.drawerlayout.widget.DrawerLayout;
import androidx.recyclerview.widget.DefaultItemAnimator;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

import android.content.Intent;
import android.content.SharedPreferences;
import android.content.res.Configuration;
import android.os.Bundle;
import android.util.Log;
import android.view.Gravity;
import android.view.MenuItem;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.Toast;

import com.esprit.go_recycle.classes.APIClient;
import com.esprit.go_recycle.dao.IDonnation;
import com.esprit.go_recycle.dao.IUser;
import com.esprit.go_recycle.models.Donnation;
import com.esprit.go_recycle.models.Sponsor;
import com.google.android.material.navigation.NavigationView;

import java.util.ArrayList;
import java.util.List;

public class ListSponsor extends AppCompatActivity implements NavigationView.OnNavigationItemSelectedListener   {

    private RecyclerView rc;
    private DrawerLayout mdrawer;
    private Toolbar mtog;
    private NavigationView sidenav;
    private ActionBarDrawerToggle toggle;
    private ArrayList<Sponsor> me;
    SponsorAdapter ev;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_list_sponsor);
        rc = findViewById(R.id.recycleviews);
        mdrawer = findViewById(R.id.drawer);
        sidenav = findViewById(R.id.sidenav);
        mtog = findViewById(R.id.toolbar);
        setSupportActionBar(mtog);
        toggle = new ActionBarDrawerToggle(this, mdrawer, mtog, R.string.open, R.string.close);
        mdrawer.addDrawerListener(toggle);
        toggle.syncState();
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);

        sidenav.setNavigationItemSelectedListener(this);

        RecyclerView.LayoutManager layoutManager = new LinearLayoutManager(getApplicationContext());
        rc.setLayoutManager(layoutManager);
        rc.setItemAnimator(new DefaultItemAnimator());

        IUser IUser = APIClient.getClient().create(IUser.class);
        IUser.getlistsponsor().enqueue(new Callback<List<Sponsor>>() {
            @Override
            public void onResponse(Call<List<Sponsor>> call, Response<List<Sponsor>> response) {

                if (response.isSuccessful()) {
                    me = new ArrayList<>(response.body());
                    ev = new SponsorAdapter(ListSponsor.this, me);
                    rc.setAdapter(ev);
                    Log.v("successssssssssssssssss",""+ response.body());

                }

            }

            @Override
            public void onFailure(Call<List<Sponsor>> call, Throwable t) {
                Log.e("failure", t.getLocalizedMessage());

            }
        });

    }






    @Override
    public boolean onNavigationItemSelected(@NonNull MenuItem item) {

        switch (item .getItemId())
        { case R.id.itemhome:
            Intent i = new Intent(ListSponsor.this, AccueilDonneur.class);
            Toast.makeText(getApplicationContext(), "home", Toast.LENGTH_SHORT).show();
            startActivity(i);
            case R.id.itemlist:
                Intent i10 = new Intent(ListSponsor.this, Listdonnation.class);
                Toast.makeText(getApplicationContext(), "donnation", Toast.LENGTH_SHORT).show();
                startActivity(i10);
                break;
            case R.id.itemevenement:
                Intent i1 = new Intent(ListSponsor.this, ListEvenement.class);
                startActivity(i1);
                break;
            case R.id.itemprofile:
                Intent i2 = new Intent(ListSponsor.this, Profildonneur.class);
                Toast.makeText(getApplicationContext(), "profil", Toast.LENGTH_SHORT).show();
                startActivity(i2);
                break;

            case R.id.itemcode:
                Intent i4 = new Intent(ListSponsor.this, qrcode.class);
                Toast.makeText(getApplicationContext(), "Qrcode", Toast.LENGTH_SHORT).show();
                startActivity(i4);
                break;
            case R.id.itemscore:
                Intent i5 = new Intent(ListSponsor.this, Score.class);
                Toast.makeText(getApplicationContext(), "Qrcode", Toast.LENGTH_SHORT).show();
                startActivity(i5);
                break;
            case R.id.itemsponsor:
                Intent i6 = new Intent(ListSponsor.this, ListSponsor.class);
                Toast.makeText(getApplicationContext(), "Qrcode", Toast.LENGTH_SHORT).show();
                startActivity(i6);
                break;
            case R.id.itemlogout:
                Intent intent = new Intent(ListSponsor.this, login.class)
                        .setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
                SharedPreferences prefs = getSharedPreferences("IdUser",
                        MODE_PRIVATE);
                SharedPreferences.Editor prefEditor = prefs.edit();
                prefEditor.remove("Key");
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
}
