package com.esprit.go_recycle;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import android.annotation.SuppressLint;
import android.content.DialogInterface;
import android.content.Intent;
import android.location.Address;
import android.location.Geocoder;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Bundle;
import android.text.InputType;
import android.util.Log;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import com.esprit.go_recycle.classes.APIClient;
import com.esprit.go_recycle.dao.IUser;
import com.esprit.go_recycle.models.Adresse;
import com.esprit.go_recycle.models.Donneur;
import com.esprit.go_recycle.models.Ramasseur;

import java.util.List;
import java.util.Locale;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class secondinscription extends AppCompatActivity implements LocationListener{
    EditText email, adresse, password, confirmpassword;
    TextView log,lat;
    Spinner status;
    Button inscrire;
    String statusname[] = {"Donneur", "Rammaseur", "Sponsor"};
    ArrayAdapter<String> arrayAdapter;
    LocationManager locationManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_secondinscription);

        email = (EditText) findViewById(R.id.Email);
        adresse = (EditText) findViewById(R.id.Adresse);
        password = findViewById(R.id.password);
        confirmpassword = (EditText) findViewById(R.id.Confirmpassword);
        inscrire = (Button) findViewById(R.id.inscrire);
        status = (Spinner) findViewById(R.id.status);
        log = findViewById(R.id.longitude);
        lat = findViewById(R.id.latitude);
        arrayAdapter = new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, statusname);
        status.setAdapter(arrayAdapter);
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
        inscrire.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                IUser IUser = APIClient.getClient().create(IUser.class);

                IUser.Checkemail(email.getText().toString()).enqueue(new Callback<Donneur>() {

                    @Override
                    public void onResponse(Call<Donneur> call, Response<Donneur> response) {
                        String rue, region, ville, nomv, prenomv;
                        String[] separated = adresse.getText().toString().split(",");


                        rue = separated[0];
                        region = separated[1];
                        ville = separated[2];
                        Toast.makeText(getApplicationContext(), "Hello :" + response.body(), Toast.LENGTH_LONG).show();
                        Log.v("TAG!!!!!!!!!!!!!!!!!", "error" +response.body());
                        if (response.body().getEmail().equals("0")){
                            Log.v("TAG!!!!!!!!!!!!!!!!!", "youcan insert email");
                            Intent intent = getIntent();
                            String nom = intent.getStringExtra("nom");
                            String prenom = intent.getStringExtra("prenom");
                            String num =intent.getStringExtra("num");
                            Log.v("inteeentt!!!!!!!!!!!!!!!!!", "ok" + nom + prenom);
                            Boolean checkPassword = password.getText().toString().equals(confirmpassword.getText().toString());
                            Log.v("inteeentt!!!!!!!!!!!!!!!!!", "ok" + checkPassword);

                            IUser IUser = APIClient.getClient().create(IUser.class);
                            String statut = status.getSelectedItem().toString();
                            if (verifyIfEditTextIsFilled(email, adresse, password, confirmpassword)) {

                                if (checkPassword) {

                                    if (statut.equals("Donneur")) {
                                        IUser.addadresse(rue,region,ville,Double.parseDouble(log.getText().toString()),Double.parseDouble(lat.getText().toString())).enqueue(new Callback<Adresse>() {

                                            @Override
                                            public void onResponse(Call<Adresse> call, Response<Adresse> response) {
                                                Toast.makeText(getApplicationContext(), "Hello :" + response.body(), Toast.LENGTH_LONG).show();
                                                 Log.v("toadd adresse","theaddresse"+response.body());

                                            }

                                            @Override
                                            public void onFailure(Call<Adresse> call, Throwable t) {
                                                // Toast.makeText(getApplicationContext(), "Échec de l'authentification", Toast.LENGTH_LONG).show();
                                                Log.v("TAG!!!!!!!!!!!!!!!!!", "error" + t.getMessage());
                                                Intent intent = new Intent(getApplicationContext(), login.class);
                                                startActivity(intent);


                                            }
                                        });
                                        IUser.Getdernieradresse().enqueue(new Callback<Adresse>() {

                                            @Override
                                            public void onResponse(Call<Adresse> call, Response<Adresse> response) {
                                                final int et=(response.body().getId_adresse());
                                                Log.v("the last aadresse","lastis"+(response.body().getId_adresse()));


                                        IUser.addDonneur(nom, prenom, "" + password.getText(), num, et,""+ email.getText()).enqueue(new Callback<Donneur>() {

                                            @Override
                                            public void onResponse(Call<Donneur> call, Response<Donneur> response) {
                                                Toast.makeText(getApplicationContext(), "Hello :" + response.body(), Toast.LENGTH_LONG).show();
                                                Intent intent = new Intent(getApplicationContext(), login.class);
                                                startActivity(intent);

                                            }

                                            @Override
                                            public void onFailure(Call<Donneur> call, Throwable t) {
                                                // Toast.makeText(getApplicationContext(), "Échec de l'authentification", Toast.LENGTH_LONG).show();
                                                Log.v("TAG!!!!!!!!!!!!!!!!!", "error" + t.getMessage());



                                            }
                                        });
                                            }

                                            @Override
                                            public void onFailure(Call<Adresse> call, Throwable t) {
                                                // Toast.makeText(getApplicationContext(), "Échec de l'authentification", Toast.LENGTH_LONG).show();
                                                Log.v("TAG!!!!!!!!!!!!!!!!!", "error" + t.getMessage());



                                            }
                                        });
                                    } else if (statut.equals("Rammaseur")) {
                                        IUser.addRamasseur(nom, prenom, "" + password.getText(), num, "" + email.getText()).enqueue(new Callback<Ramasseur>() {

                                            @Override
                                            public void onResponse(Call<Ramasseur> call, Response<Ramasseur> response) {
                                                Toast.makeText(getApplicationContext(), "Hello :" + response.body(), Toast.LENGTH_LONG).show();
                                                Intent intent = new Intent(getApplicationContext(), login.class);
                                                startActivity(intent);

                                            }

                                            @Override
                                            public void onFailure(Call<Ramasseur> call, Throwable t) {
                                                // Toast.makeText(getApplicationContext(), "Échec de l'authentification", Toast.LENGTH_LONG).show();
                                                Log.v("TAG!!!!!!!!!!!!!!!!!", "error" + t.getMessage());
                                                Intent intent = new Intent(getApplicationContext(), login.class);
                                                startActivity(intent);


                                            }
                                        });
                                    }

                                } else {
                                    AlertDialog alertDialog = new AlertDialog.Builder(secondinscription.this).create();
                                    alertDialog.setTitle("Alert");
                                    alertDialog.setMessage("Mot de passe non identiques");
                                    alertDialog.setButton(AlertDialog.BUTTON_NEUTRAL, "OK",
                                            new DialogInterface.OnClickListener() {
                                                public void onClick(DialogInterface dialog, int which) {
                                                    dialog.dismiss();
                                                }
                                            });
                                    alertDialog.show();
                                }
                            }


                    }else
                        {
                            AlertDialog alertDialog = new AlertDialog.Builder(secondinscription.this).create();
                            alertDialog.setTitle("Alert");
                            alertDialog.setMessage("L'adresse existe deja ");
                            alertDialog.setButton(AlertDialog.BUTTON_NEUTRAL, "OK",
                                    new DialogInterface.OnClickListener() {
                                        public void onClick(DialogInterface dialog, int which) {
                                            dialog.dismiss();
                                        }
                                    });
                            alertDialog.show();
                        }
                    }


                    @Override
                    public void onFailure(Call<Donneur> call, Throwable t) {
                        // Toast.makeText(getApplicationContext(), "Échec de l'authentification", Toast.LENGTH_LONG).show();
                        Log.v("TAG!!!!!!!!!!!!!!!!!", "woooooherror" + t.getMessage());



                    }
                });

/*
                Intent intent = getIntent();
                String nom = intent.getStringExtra("nom");
                String prenom = intent.getStringExtra("prenom");
                Log.v("inteeentt!!!!!!!!!!!!!!!!!", "ok" + nom + prenom);
                Boolean checkPassword = password.getText().toString().equals(confirmpassword.getText().toString());
                Log.v("inteeentt!!!!!!!!!!!!!!!!!", "ok" + checkPassword);

                            IUser IUser = APIClient.getClient().create(IUser.class);
                            String statut = status.getSelectedItem().toString();
                            if (verifyIfEditTextIsFilled(email, adresse, password, confirmpassword)) {

                                if (checkPassword) {

                                    if (statut.equals("Donneur")) {
                                        IUser.addDonneur(nom, prenom, "" + password.getText(), "999", "" + email.getText()).enqueue(new Callback<Donneur>() {

                                            @Override
                                            public void onResponse(Call<Donneur> call, Response<Donneur> response) {
                                                Toast.makeText(getApplicationContext(), "Hello :" + response.body(), Toast.LENGTH_LONG).show();
                                                Intent intent = new Intent(getApplicationContext(), login.class);
                                                startActivity(intent);

                                            }

                                            @Override
                                            public void onFailure(Call<Donneur> call, Throwable t) {
                                                // Toast.makeText(getApplicationContext(), "Échec de l'authentification", Toast.LENGTH_LONG).show();
                                                Log.v("TAG!!!!!!!!!!!!!!!!!", "error" + t.getMessage());
                                                Intent intent = new Intent(getApplicationContext(), login.class);
                                                startActivity(intent);


                                            }
                                        });
                                    } else if (statut.equals("Rammaseur")) {
                                        IUser.addRamasseur(nom, prenom, "" + password.getText(), "999", "" + email.getText()).enqueue(new Callback<Ramasseur>() {

                                            @Override
                                            public void onResponse(Call<Ramasseur> call, Response<Ramasseur> response) {
                                                Toast.makeText(getApplicationContext(), "Hello :" + response.body(), Toast.LENGTH_LONG).show();
                                                Intent intent = new Intent(getApplicationContext(), login.class);
                                                startActivity(intent);

                                            }

                                            @Override
                                            public void onFailure(Call<Ramasseur> call, Throwable t) {
                                                // Toast.makeText(getApplicationContext(), "Échec de l'authentification", Toast.LENGTH_LONG).show();
                                                Log.v("TAG!!!!!!!!!!!!!!!!!", "error" + t.getMessage());
                                                Intent intent = new Intent(getApplicationContext(), login.class);
                                                startActivity(intent);


                                            }
                                        });
                                    }

                                } else {
                                    AlertDialog alertDialog = new AlertDialog.Builder(secondinscription.this).create();
                                    alertDialog.setTitle("Alert");
                                    alertDialog.setMessage("Mot de passe non identiques");
                                    alertDialog.setButton(AlertDialog.BUTTON_NEUTRAL, "OK",
                                            new DialogInterface.OnClickListener() {
                                                public void onClick(DialogInterface dialog, int which) {
                                                    dialog.dismiss();
                                                }
                                            });
                                    alertDialog.show();
                                }
                            }
                        }





*/}

        });
    }


    private boolean verifyIfEditTextIsFilled(EditText... editText) {

        boolean result = true;

        for (EditText text : editText) {

            if (text.getText().toString().isEmpty()) {
                final View focusView = text;
                text.setError("Veuillez remplir tous les champs");
                focusView.requestFocus();
                result = false;
            }
        }
        return result;
    }

    private void verifyIfEMailexist(String email) {
        IUser IUser = APIClient.getClient().create(IUser.class);
        IUser.Checkemail(email).enqueue(new Callback<Donneur>() {

            @Override
            public void onResponse(Call<Donneur> call, Response<Donneur> response) {
                Toast.makeText(getApplicationContext(), "yes exist :" + response.body().getNum_tel(), Toast.LENGTH_LONG).show();
                String x = response.body().getNum_tel();

            }

            @Override
            public void onFailure(Call<Donneur> call, Throwable t) {
                // Toast.makeText(getApplicationContext(), "Échec de l'authentification", Toast.LENGTH_LONG).show();
                Log.v("TAG!!!!!!!!!!!!!!!!!", "error" + t.getMessage());
                Intent intent = new Intent(getApplicationContext(), login.class);
                startActivity(intent);


            }
        });


    }

    @SuppressLint("MissingPermission")
    private void getLocation() {

        try {
            locationManager = (LocationManager) getApplicationContext().getSystemService(LOCATION_SERVICE);
            locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER,5000,5, (LocationListener) secondinscription.this);

        }catch (Exception e){
            e.printStackTrace();
        }

    }


    @Override
    public void onLocationChanged(Location location) {
        Toast.makeText(this, ""+location.getLatitude()+","+location.getLongitude(), Toast.LENGTH_SHORT).show();
        try {
            Geocoder geocoder = new Geocoder(secondinscription.this, Locale.getDefault());
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
