package com.esprit.go_recycle;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.esprit.go_recycle.classes.APIClient;
import com.esprit.go_recycle.dao.IRamasseur;
import com.esprit.go_recycle.dao.IUser;
import com.esprit.go_recycle.models.Donneur;
import com.esprit.go_recycle.models.Ramasseur;

public class Ramasseurpswd extends AppCompatActivity {
    EditText code,password,repetpasswrod;
    Button Reset;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_ramasseurpswd);
        code=findViewById(R.id.cd);
        password=findViewById(R.id.pass);
        repetpasswrod=findViewById(R.id.rep);
        Reset=findViewById(R.id.reset);
        final   String  ff=getIntent().getStringExtra("authen");
        final   String  email=getIntent().getStringExtra("email");


        Reset.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                {
                    Intent intent = getIntent();
                    Boolean checkPassword = password.getText().toString().equals(repetpasswrod.getText().toString());
                    Boolean Checkcode = code.getText().toString().equals(ff);
                    Log.v("inteeentt!!!!!!!!!!!!!!!!!", "ok" + checkPassword);
                    Log.v("inteeentt!!!!!!!!!!!!!!!!!", "ok" + Checkcode);
                    Log.v("inteeentt!!!!!!!!!!!!!!!!!", "ok" + email);

                    IRamasseur IUser = APIClient.getClient().create(IRamasseur.class);

                    if (verifyIfEditTextIsFilled(code, password, repetpasswrod)) {

                        if (checkPassword) {
                            if (Checkcode) {
                                IUser.resetpass(String.valueOf(password.getText()),email).enqueue(new Callback<Ramasseur>() {

                                    @Override
                                    public void onResponse(Call<Ramasseur> call, Response<Ramasseur> response) {
                                        Toast.makeText(getApplicationContext(), "Votre mot de passe a ete modifier " ,Toast.LENGTH_LONG).show();
                                        Intent intent = new Intent(getApplicationContext(), RamasseurProfil.class);
                                        startActivity(intent);

                                    }

                                    @Override
                                    public void onFailure(Call<Ramasseur> call, Throwable t) {
                                        // Toast.makeText(getApplicationContext(), "Échec de l'authentification", Toast.LENGTH_LONG).show();
                                        Log.v("TAG!!!!!!!!!!!!!!!!!", "error" + t.getMessage());



                                    }
                                });
                            }
                            else {
                                AlertDialog alertDialog = new AlertDialog.Builder(Ramasseurpswd.this).create();
                                alertDialog.setTitle("Alert");
                                alertDialog.setMessage("Code erroné verifier votre mail");
                                alertDialog.setButton(AlertDialog.BUTTON_NEUTRAL, "OK",
                                        new DialogInterface.OnClickListener() {
                                            public void onClick(DialogInterface dialog, int which) {
                                                dialog.dismiss();
                                            }
                                        });
                                alertDialog.show();}
                        }


                    } else {
                        AlertDialog alertDialog = new AlertDialog.Builder(Ramasseurpswd.this).create();
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