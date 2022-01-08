package com.esprit.go_recycle;

import androidx.appcompat.app.AppCompatActivity;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.media.Image;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.inputmethod.EditorInfo;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.esprit.go_recycle.classes.APIClient;
import com.esprit.go_recycle.dao.IUser;
import com.esprit.go_recycle.models.Donneur;
import com.esprit.go_recycle.models.Ramasseur;
import com.esprit.go_recycle.models.Sponsor;
import com.esprit.go_recycle.models.Users;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class login extends AppCompatActivity {
ImageView logo;
EditText email , password ;
SharedPreferences shared;
Button connecter;
TextView creercompte,forgetpassword;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        logo=(ImageView)findViewById(R.id.logo);
        email=(EditText)findViewById(R.id.email);
        password=(EditText)findViewById(R.id.password);
        connecter=(Button)findViewById(R.id.seconnecter);
        creercompte=(TextView)findViewById(R.id.creercompte);
        forgetpassword=(TextView)findViewById(R.id.forgetpassword);
        shared=getSharedPreferences("IdUser",MODE_PRIVATE);
           creercompte.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getApplicationContext(), inscription.class);
                startActivity(intent);
            }
        });
        forgetpassword.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getApplicationContext(), SendEmail.class);
                startActivity(intent);
            }
        });
        connecter.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {



                if (verifyIfEditTextIsFilled(email, password))

                {
                    IUser IUser = APIClient.getClient().create(IUser.class);
                    IUser.login((email.getText().toString()), password.getText().toString()).enqueue(new Callback<Donneur>() {
                        @Override
                        public void onResponse(Call<Donneur> call, Response<Donneur> response) {
                           // Toast.makeText(getApplicationContext(), "Helloooo :" + response.body().getId(), Toast.LENGTH_LONG).show();
                            Log.v("your id is",""+response.body().getId());
                            Intent intent = new Intent(getApplicationContext(), Sliderguide.class);
                            SharedPreferences.Editor editshared=shared.edit();
                            editshared.putString("Key",""+response.body().getId());
                            String s=response.body().getId_adress();
                            editshared.putString("adresse",""+s);
                            editshared.commit();
                           // intent.putExtra("data", String.valueOf(response.body().getId()));


                            startActivity(intent);
                        }

                        @Override
                        public void onFailure(Call<Donneur> call, Throwable t) {
                            IUser IUser = APIClient.getClient().create(IUser.class);
                            IUser.loginr((email.getText().toString()), password.getText().toString()).enqueue(new Callback<Ramasseur>() {
                                @Override
                                public void onResponse(Call<Ramasseur> call, Response<Ramasseur> response) {
                                 //   Toast.makeText(getApplicationContext(), "Helloooo :" + response.body().getId(), Toast.LENGTH_LONG).show();
                                    Log.v("your id is","ramasseur"+response.body().getId());
                                    Intent intent = new Intent(getApplicationContext(), AccueilRamasseur.class);
                                    SharedPreferences.Editor editshared=shared.edit();
                                    editshared.putString("idramasseur",""+response.body().getId());
                                    editshared.putString("url",""+response.body().getImage());
                                    editshared.commit();
                                    // intent.putExtra("data", String.valueOf(response.body().getId()));


                                    startActivity(intent);
                                }

                                @Override
                                public void onFailure(Call<Ramasseur> call, Throwable t) {
                                    IUser IUser = APIClient.getClient().create(IUser.class);
                                    IUser.logins((email.getText().toString()), password.getText().toString()).enqueue(new Callback<Sponsor>() {
                                        @Override
                                        public void onResponse(Call<Sponsor> call, Response<Sponsor> response) {
                                           // Toast.makeText(getApplicationContext(), "Helloooo :" + response.body().getId_sponsor(), Toast.LENGTH_LONG).show();
                                            Log.v("your id is","ramasseur"+response.body().getId_sponsor());
                                            Intent intent = new Intent(getApplicationContext(), AccueilSponsor.class);
                                            SharedPreferences.Editor editshared=shared.edit();
                                            editshared.putString("id_sponsor",""+response.body().getId_sponsor());
                                            editshared.commit();
                                            // intent.putExtra("data", String.valueOf(response.body().getId()));


                                            startActivity(intent);
                                        }

                                        @Override
                                        public void onFailure(Call<Sponsor> call, Throwable t) {




                                            AlertDialog alertDialog = new AlertDialog.Builder(login.this).create();
                                            alertDialog.setTitle("Erreur");
                                            alertDialog.setMessage("Verifiez vos coordonnées ");
                                            alertDialog.setButton(AlertDialog.BUTTON_NEUTRAL, "OK",
                                                    new DialogInterface.OnClickListener() {
                                                        public void onClick(DialogInterface dialog, int which) {
                                                            dialog.dismiss();
                                                            //Toast.makeText(getApplicationContext(), "Échec de l'authentification", Toast.LENGTH_LONG).show();
                                                            Log.v("TAG!!!!!!!!!!!!!!!!!", "errorooo" + t.getMessage());
                                                            Intent intent= new Intent(getApplicationContext(),login.class);
                                                            startActivity(intent);
                                                        }
                                                    });
                                            alertDialog.show();




                                        }
                                    });


                                }
                            });

                        }
                    });
                }

            }
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
}