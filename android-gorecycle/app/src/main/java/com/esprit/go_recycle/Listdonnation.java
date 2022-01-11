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
import android.widget.Toast;

import com.esprit.go_recycle.classes.APIClient;
import com.esprit.go_recycle.dao.IDonnation;
import com.esprit.go_recycle.dao.IEvenement;
import com.esprit.go_recycle.models.Donnation;
import com.esprit.go_recycle.models.Evenement;
import com.esprit.go_recycle.models.solde;
import com.google.android.material.navigation.NavigationView;

import java.util.ArrayList;
import java.util.List;

public class Listdonnation extends AppCompatActivity  implements NavigationView.OnNavigationItemSelectedListener  {
    private ArrayList<modeldetail> md;
    private RecyclerView rc;
    private DrawerLayout mdrawer;
    private Toolbar mtog;
    private NavigationView sidenav;
    private ActionBarDrawerToggle toggle;
    private ArrayList<Donnation> me;
    DonnationAdapter ev;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_listdonnation);
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

        sidenav.setNavigationItemSelectedListener(this);
        setDonnatiodetail();
        setAdapter();
        SharedPreferences prefs = getSharedPreferences("IdUser",
                MODE_PRIVATE);

        final String string = prefs.getString("Key", null);
        IDonnation IUser = APIClient.getClient().create(IDonnation.class);
        IUser.getmydonnation(Integer.parseInt(string)).enqueue(new Callback<List<Donnation>>() {
            @Override
            public void onResponse(Call<List<Donnation>> call, Response<List<Donnation>> response) {

                if (response.isSuccessful()) {
                    me = new ArrayList<>(response.body());
                    ev = new DonnationAdapter(Listdonnation.this, me);
                    rc.setAdapter(ev);
                    Log.v("successssssssssssssssss", response.body().toString());



                }

            }

            @Override
            public void onFailure(Call<List<Donnation>> call, Throwable t) {
                Log.e("failure", t.getLocalizedMessage());

            }
        });

    }

    private void setAdapter() {
        RecycleAdapter ad = new RecycleAdapter(md);
        RecyclerView.LayoutManager layoutManager = new LinearLayoutManager(getApplicationContext());
        rc.setLayoutManager(layoutManager);
        rc.setItemAnimator(new DefaultItemAnimator());
        rc.setAdapter(ad);


    }

    private void setDonnatiodetail() {
        md.add(new modeldetail("bouteille", "5bouteille", "djdjdj", "21/02/2020"));
        md.add(new modeldetail("verre", "2 bouteille", "cjfjz8", "21/11/2020"));
    }


    @Override
    public boolean onNavigationItemSelected(@NonNull MenuItem item) {

        switch (item .getItemId())
        { case R.id.itemhome:
            Intent i = new Intent(Listdonnation.this, AccueilDonneur.class);
            Toast.makeText(getApplicationContext(), "home", Toast.LENGTH_SHORT).show();
            startActivity(i);
            break;
            case R.id.itemlist:
                Intent b = new Intent(Listdonnation.this, Listdonnation.class);
                Toast.makeText(getApplicationContext(), "evenemnt", Toast.LENGTH_SHORT).show();
                startActivity(b);
                break;
            case R.id.itemevenement:
                Intent i1 = new Intent(Listdonnation.this, ListEvenement.class);
                startActivity(i1);
                break;
            case R.id.itemprofile:
                Intent i2 = new Intent(Listdonnation.this, Profildonneur.class);
                Toast.makeText(getApplicationContext(), "profil", Toast.LENGTH_SHORT).show();
                startActivity(i2);
                break;

            case R.id.itemcode:
                Intent i4 = new Intent(Listdonnation.this, qrcode.class);
                Toast.makeText(getApplicationContext(), "Qrcode", Toast.LENGTH_SHORT).show();
                startActivity(i4);
                break;
            case R.id.itemscore:
                Intent i5 = new Intent(Listdonnation.this, Score.class);
                Toast.makeText(getApplicationContext(), "Qrcode", Toast.LENGTH_SHORT).show();
                startActivity(i5);
                break;
            case R.id.itemsponsor:
                Intent i6 = new Intent(Listdonnation.this, ListSponsor.class);
                Toast.makeText(getApplicationContext(), "Qrcode", Toast.LENGTH_SHORT).show();
                startActivity(i6);
                break;
            case R.id.itemlogout:
                Intent intent = new Intent(Listdonnation.this, login.class)
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
