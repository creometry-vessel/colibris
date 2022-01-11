package com.esprit.go_recycle;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

import android.Manifest;
import android.annotation.SuppressLint;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.location.Address;
import android.location.Geocoder;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Bundle;
import android.text.InputType;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.esprit.go_recycle.classes.APIClient;
import com.esprit.go_recycle.dao.IEvenement;
import com.esprit.go_recycle.dao.IUser;
import com.esprit.go_recycle.models.Adresse;
import com.esprit.go_recycle.models.Donneur;
import com.esprit.go_recycle.models.Evenement;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

public class Profildonneur extends AppCompatActivity implements LocationListener {
    TextView nom,prenom, adresse, numero,log,lat;
    Button save;
    LocationManager locationManager;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_profildonneur);
        nom = findViewById(R.id.firstname);
        prenom = findViewById(R.id.lastname);
        numero = findViewById(R.id.numdonneur);
        adresse = findViewById(R.id.adressedonneur);
        log = findViewById(R.id.longitude);
        lat = findViewById(R.id.latitude);
        if (ContextCompat.checkSelfPermission(Profildonneur.this, Manifest.permission.ACCESS_FINE_LOCATION)
                != PackageManager.PERMISSION_GRANTED){
            ActivityCompat.requestPermissions(Profildonneur.this,new String[]{
                    Manifest.permission.ACCESS_FINE_LOCATION
            },100);
        }
        SharedPreferences prefs = getSharedPreferences("IdUser",
                MODE_PRIVATE);
        final String string = prefs.getString("Key", null);
        final String id_ad = prefs.getString("adresse", null);
        IUser myad = APIClient.getClient().create(IUser.class);
        myad.getmyadresse(Integer.parseInt(string)).enqueue(new Callback<Adresse>() {
            @Override
            public void onResponse(Call<Adresse> call, Response<Adresse> response) {
                Log.v("successssssssssssssssss", response.body().toString());
                adresse.setText(response.body().getRue() + "," + response.body().getRegion() + " ," + response.body().getVille());
                int id_ad=response.body().getId_adresse();

            }

            @Override
            public void onFailure(Call<Adresse> call, Throwable t) {

            }


        });

        IUser IUser = APIClient.getClient().create(IUser.class);
        IUser.getprofil(Integer.parseInt(string)).enqueue(new Callback<Donneur>() {
            @Override
            public void onResponse(Call<Donneur> call, Response<Donneur> response) {
                Log.v("successssssssssssssssss", response.body().toString());
                nom.setText(response.body().getNom());
                prenom.setText(response.body().getPrenom());
                numero.setText(response.body().getNum_tel());


            }

            @Override
            public void onFailure(Call<Donneur> call, Throwable t) {

            }


        });

        Log.v("iduser", "" + string);
        nom.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                nom.setCursorVisible(true);
                nom.setFocusableInTouchMode(true);
                nom.setInputType(InputType.TYPE_CLASS_TEXT);

                nom.requestFocus(); //to trigger the soft input);
            }
        });
        prenom.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                prenom.setCursorVisible(true);
                prenom.setFocusableInTouchMode(true);
                prenom.setInputType(InputType.TYPE_CLASS_TEXT);

                prenom.requestFocus(); //to trigger the soft input);
            }
        });

        adresse.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                adresse.setCursorVisible(true);
                adresse.setFocusableInTouchMode(true);
                adresse.setInputType(InputType.TYPE_CLASS_TEXT);

                adresse.requestFocus();
                //to trigger the soft input);
                getLocation();
            }
        });

        numero.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                numero.setCursorVisible(true);
                numero.setFocusableInTouchMode(true);
                numero.setInputType(InputType.TYPE_CLASS_TEXT);
                numero.requestFocus(); //to trigger the soft input);
            }
        });
        save = findViewById(R.id.btnsave);
        save.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String rue, region, ville, nomv, prenomv;
                String[] separated = adresse.getText().toString().split(",");


                rue = separated[0];
                region = separated[1];
                ville = separated[2];

                Log.v("the adressseis", "" + ville + region + rue);



                IUser myad = APIClient.getClient().create(IUser.class);
                myad.updateadresse(rue, region, ville,Double.parseDouble(log.getText().toString()),Double.parseDouble(lat.getText().toString()), Integer.parseInt(id_ad)).enqueue(new Callback<Adresse>() {
                    @Override
                    public void onResponse(Call<Adresse> call, Response<Adresse> response) {


                    }

                    @Override
                    public void onFailure(Call<Adresse> call, Throwable t) {

                    }


                });
                IUser up = APIClient.getClient().create(IUser.class);
                up.updateuser(nom.getText().toString(), prenom.getText().toString(), numero.getText().toString(), Integer.parseInt(string)).enqueue(new Callback<Donneur>() {


                    @Override
                    public void onResponse(Call<Donneur> call, Response<Donneur> response) {

                        Intent intent = new Intent(getApplicationContext(), AccueilDonneur.class);


                        startActivity(intent);

                    }

                    @Override
                    public void onFailure(Call<Donneur> call, Throwable t) {

                    }
                });
            }
        });
    }



    @SuppressLint("MissingPermission")
    private void getLocation() {

        try {
            locationManager = (LocationManager) getApplicationContext().getSystemService(LOCATION_SERVICE);
            locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER,5000,5, (LocationListener) Profildonneur.this);

        }catch (Exception e){
            e.printStackTrace();
        }

    }

    @Override
    public void onLocationChanged(Location location) {
        Toast.makeText(this, ""+location.getLatitude()+","+location.getLongitude(), Toast.LENGTH_SHORT).show();
        try {
            Geocoder geocoder = new Geocoder(Profildonneur.this, Locale.getDefault());
            List<Address> addresses = geocoder.getFromLocation(location.getLatitude(),location.getLongitude(),1);
            String address = addresses.get(0).getAddressLine(0);

            adresse.setText(address);
log.setText(""+location.getLongitude());
lat.setText(""+location.getLatitude());
        }catch (Exception e){
            e.printStackTrace();
        }

    }

    @Override
    public void onStatusChanged(String provider, int status, Bundle extras) {

    }

    @Override
    public void onProviderEnabled(String provider) {

    }

    @Override
    public void onProviderDisabled(String provider) {

    }
}

