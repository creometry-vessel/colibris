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
import android.view.View;
import android.widget.Button;

import com.esprit.go_recycle.classes.APIClient;
import com.esprit.go_recycle.dao.IRamasseur;
import com.esprit.go_recycle.models.Map;
import com.google.android.material.navigation.NavigationView;

import java.util.ArrayList;
import java.util.List;

public class yellow_from_map extends AppCompatActivity implements NavigationView.OnNavigationItemSelectedListener {
    private ArrayList<Map> md;
    private RecyclerView rc;
    private DrawerLayout mdrawer;
    private Toolbar mtog;
    private NavigationView sidenav;
    private ActionBarDrawerToggle toggle;
    private ArrayList<Map> me;

    InfoAdapter ev;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_yellow_from_map);
        String ff = getIntent().getStringExtra("mapadr");
        final String y = getIntent().getStringExtra("mapid");


        rc = findViewById(R.id.recycleview);
        md = new ArrayList<>();
        mdrawer = findViewById(R.id.drawer);
        sidenav = findViewById(R.id.sidenav);


        mtog = findViewById(R.id.toolbar);
        setSupportActionBar(mtog);
        toggle = new ActionBarDrawerToggle(this, mdrawer, mtog, R.string.open, R.string.close);
        mdrawer.addDrawerListener(toggle);
        toggle.syncState();
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);

        setSupportActionBar(mtog);
        SharedPreferences prefs = getSharedPreferences("IdUser",
                MODE_PRIVATE);
        final String string = prefs.getString("idramasseur", null);
        RecyclerView.LayoutManager layoutManager = new LinearLayoutManager(getApplicationContext());
        rc.setLayoutManager(layoutManager);
        rc.setItemAnimator(new DefaultItemAnimator());



        rc.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

            }
        });
        sidenav.setNavigationItemSelectedListener(this);
        Log.v("id_adresse","vvvvvv"+ff);


        IRamasseur IUser = APIClient.getClient().create(IRamasseur.class);
        IUser.getyellow(Integer.parseInt(string)).enqueue(new Callback<List<Map>>(){
            @Override
            public void onResponse(Call<List<Map>> call, Response<List<Map>> response) {

                if (response.isSuccessful()) {
                    me = new ArrayList<>(response.body());
                    ev = new InfoAdapter(yellow_from_map.this, me);
                    rc.setAdapter(ev);
                    Log.v("successssssssssssssssss", response.body().toString());


                }

            }

            @Override
            public void onFailure(Call<List<Map>> call, Throwable t) {
                Log.e("failure", t.getLocalizedMessage());

            }
        });

    }
/*
    private void setAdapter() {
        EvenementAdapter ad = new EvenementAdapter();
        RecyclerView.LayoutManager layoutManager = new LinearLayoutManager(getApplicationContext());
        rc.setLayoutManager(layoutManager);
        rc.setItemAnimator(new DefaultItemAnimator());
        rc.setAdapter(ad);


    }*/



/*
    public void getAllevenements(){
        String  ff=getIntent().getStringExtra("data");
        Log.v("yaalllllllllllllllllll",ff);
        Call<List<Evenement>> userlist = APIClient.getEvenementService().getmy(ff);
        Log.v("cvjjvjjvj",ff);
        userlist.enqueue(new Callback<List<Evenement>>() {
            @Override
            public void onResponse(Call<List<Evenement>> call, Response<List<Evenement>> response) {

                if(response.isSuccessful()){
                    me=new ArrayList<>(response.body());
                    ev=new EvenementAdapter(ListEvenement.this,me);
                    rc.setAdapter(ev);
                    Log.v("successssssssssssssssss",response.body().toString());




                }

            }

            @Override
            public void onFailure(Call<List<Evenement>> call, Throwable t) {
                Log.e("failure",t.getLocalizedMessage());

            }
        });
    }*/

/*
    private void setDonnatiodetail() {
        me.add(new modelevement("CleanUP", "Ghazella technopole", "khalil mahdi", "21/12/2020"));
        me.add(new modelevement("recycle", "lac3", "Club x", "21/11/2020"));
    }*/


    @Override
    public boolean onNavigationItemSelected(@NonNull MenuItem item) {
/*
        switch (item.getItemId()) {
            case R.id.itemhome:
                Intent i = new Intent(i.this, AccueilDonneur.class);
                Toast.makeText(getApplicationContext(), "home", Toast.LENGTH_SHORT).show();
                startActivity(i);
                break;
            case R.id.itemlist:
                Intent b = new Intent(ListCreation.this, Listdonnation.class);
                Toast.makeText(getApplicationContext(), "evenemnt", Toast.LENGTH_SHORT).show();
                startActivity(b);
                break;
            case R.id.itemevenement:

                break;
            case R.id.itemprofile:
                break;
            case R.id.itemparametres:
                break;
            case R.id.itemcode:
                break;
            case R.id.itemscore:
                break;
            case R.id.itemlogout:
                break;
        }*/
        mdrawer.closeDrawer(GravityCompat.START);

        return true;

    }

    @Override
    public void onBackPressed() {
        if (mdrawer.isDrawerOpen(Gravity.RIGHT)) {
            mdrawer.closeDrawer(Gravity.LEFT);
        } else {
            super.onBackPressed();
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