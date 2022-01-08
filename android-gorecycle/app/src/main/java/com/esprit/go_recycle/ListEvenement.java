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
import android.widget.ImageButton;
import android.widget.TextView;
import android.widget.Toast;

import com.esprit.go_recycle.classes.APIClient;
import com.esprit.go_recycle.dao.IEvenement;
import com.esprit.go_recycle.dao.IUser;
import com.esprit.go_recycle.models.Donneur;
import com.esprit.go_recycle.models.Evenement;
import com.google.android.material.navigation.NavigationView;

import java.util.ArrayList;
import java.util.List;

public class ListEvenement extends AppCompatActivity  implements NavigationView.OnNavigationItemSelectedListener {
    private ArrayList<Evenement> me;

    private RecyclerView rc;
    private DrawerLayout mdrawer;
    private Toolbar mtog;
    private NavigationView sidenav;
    private ActionBarDrawerToggle toggle;
    private ImageButton addevent;
    Button btn;
    EvenementAdapter ev;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_list_evenement);
        addevent = findViewById(R.id.addevent);
        rc = findViewById(R.id.recycleview1);
        String ff = getIntent().getStringExtra("data");
        mdrawer = findViewById(R.id.drawer);
        btn=findViewById(R.id.mycreation);


        sidenav = findViewById(R.id.sidenav);
        mtog = findViewById(R.id.toolbar);
        setSupportActionBar(mtog);
        SharedPreferences prefs = getSharedPreferences("IdUser",
                MODE_PRIVATE);
        final String string = prefs.getString("Key", null);
        RecyclerView.LayoutManager layoutManager = new LinearLayoutManager(getApplicationContext());
        rc.setLayoutManager(layoutManager);
        rc.setItemAnimator(new DefaultItemAnimator());

        btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getApplicationContext(), ListCreation.class);
                startActivity(intent);
            }
        });
        toggle = new ActionBarDrawerToggle(this, mdrawer, mtog, R.string.open, R.string.close);
        mdrawer.addDrawerListener(toggle);
        toggle.syncState();
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);

        rc.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

            }
        });
        sidenav.setNavigationItemSelectedListener(this);


        addevent.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getApplicationContext(), AjouterEvenemnt.class);
                startActivity(intent);
            }
        });
        IEvenement IUser = APIClient.getClient().create(IEvenement.class);
        IUser.getmy(Integer.parseInt(string)).enqueue(new Callback<List<Evenement>>() {
            @Override
            public void onResponse(Call<List<Evenement>> call, Response<List<Evenement>> response) {

                if (response.isSuccessful()) {
                    me = new ArrayList<>(response.body());
                    ev = new EvenementAdapter(ListEvenement.this, me);
                    rc.setAdapter(ev);
                    Log.v("successssssssssssssssss", response.body().toString());


                }

            }

            @Override
            public void onFailure(Call<List<Evenement>> call, Throwable t) {
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

        switch (item.getItemId()) {
            case R.id.itemhome:
                Intent i = new Intent(ListEvenement.this, AccueilDonneur.class);
                Toast.makeText(getApplicationContext(), "home", Toast.LENGTH_SHORT).show();
                startActivity(i);
                break;
            case R.id.itemlist:
                Intent b = new Intent(ListEvenement.this, Listdonnation.class);
                Toast.makeText(getApplicationContext(), "evenemnt", Toast.LENGTH_SHORT).show();
                startActivity(b);
                break;
            case R.id.itemevenement:
                Intent i1 = new Intent(ListEvenement.this, ListEvenement.class);
                startActivity(i1);
                break;
            case R.id.itemprofile:
                Intent i2 = new Intent(ListEvenement.this, Profildonneur.class);
                Toast.makeText(getApplicationContext(), "profil", Toast.LENGTH_SHORT).show();
                startActivity(i2);
                break;

            case R.id.itemcode:
                Intent i4 = new Intent(ListEvenement.this, qrcode.class);
                Toast.makeText(getApplicationContext(), "Qrcode", Toast.LENGTH_SHORT).show();
                startActivity(i4);
                break;
            case R.id.itemscore:
                Intent i5 = new Intent(ListEvenement.this, Score.class);
                Toast.makeText(getApplicationContext(), "Qrcode", Toast.LENGTH_SHORT).show();
                startActivity(i5);
                break;
            case R.id.itemsponsor:
                Intent i6 = new Intent(ListEvenement.this, ListSponsor.class);
                Toast.makeText(getApplicationContext(), "Qrcode", Toast.LENGTH_SHORT).show();
                startActivity(i6);
                break;
            case R.id.itemlogout:
                Intent intent = new Intent(ListEvenement.this, login.class)
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
