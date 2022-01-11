package com.esprit.go_recycle;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

import android.app.DatePickerDialog;
import android.app.TimePickerDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.TextView;
import android.widget.TimePicker;
import android.widget.Toast;

import com.esprit.go_recycle.classes.APIClient;
import com.esprit.go_recycle.dao.IDonnation;
import com.esprit.go_recycle.dao.IRamasseur;
import com.esprit.go_recycle.models.Donation;
import com.esprit.go_recycle.models.Donnation;
import com.esprit.go_recycle.models.solde;

import java.util.Calendar;

public class Infodetails extends AppCompatActivity {
    TextView nom,num,datecollecte,temps;
    Button ajouter;

    DatePickerDialog datePickerDialog;
    int year;
    int mHour;
    int month;
    int mMinute;
    int dayOfMonth;
    Calendar calendar;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_infodetails);


        nom=findViewById(R.id.nomdetail);
        num=findViewById(R.id.numdetail);

        datecollecte=findViewById(R.id.datecollecte);
        temps=findViewById(R.id.tempsattente);
        ajouter=findViewById(R.id.btnajouter);
        final String y = getIntent().getStringExtra("id_donneur");
        SharedPreferences prefs = getSharedPreferences("IdUser",
                MODE_PRIVATE);
        SharedPreferences pref = getSharedPreferences("y",
                MODE_PRIVATE);
        final String string = prefs.getString("idramasseur", null);




        IRamasseur IUser = APIClient.getClient().create(IRamasseur.class);
        IUser.getoneselecteddonnation(Integer.parseInt(y)).enqueue(new Callback<Donation>() {
            @Override
            public void onResponse(Call<Donation> call, Response<Donation> response) {
                Log.v("successssssssssssssssss", response.body().toString());
                nom.setText(response.body().getNom()+response.body().getPrenom());
                num.setText(response.body().getNum_tel());

            }

            @Override
            public void onFailure(Call<Donation> call, Throwable t) {
                Log.e("failure", t.getLocalizedMessage());
            }
        });
        datecollecte.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {


                calendar = Calendar.getInstance();
                year = calendar.get(Calendar.YEAR);

                month = calendar.get(Calendar.MONTH);
                dayOfMonth = calendar.get(Calendar.DAY_OF_MONTH);
                datePickerDialog = new DatePickerDialog(Infodetails.this,
                        new DatePickerDialog.OnDateSetListener() {
                            @Override
                            public void onDateSet(DatePicker datePicker, int year, int month, int day) {
                               datecollecte.setText(year + "-" + (month + 1) + "-" + day);
                            }
                        }, year, month, dayOfMonth);
                datePickerDialog.getDatePicker().setMinDate(System.currentTimeMillis());
                datePickerDialog.show();
                // Get Current Time
                final Calendar c = Calendar.getInstance();
                mHour = c.get(Calendar.HOUR_OF_DAY);
                mMinute = c.get(Calendar.MINUTE);

                // Launch Time Picker Dialog
                TimePickerDialog timePickerDialog = new TimePickerDialog(Infodetails.this,
                        new TimePickerDialog.OnTimeSetListener() {

                            @Override
                            public void onTimeSet(TimePicker timePicker, int i, int i1) {
                                temps.setText(i + ":" + i1);
                            }

                        }, mHour, mMinute, false);
                timePickerDialog.show();
            }

            });

        ////Btn Annuler
        ajouter.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                androidx.appcompat.app.AlertDialog.Builder builder = new AlertDialog.Builder(Infodetails.this);
                builder.setMessage("Vous etes sur d'ajouter cette donnation ?")
                        .setCancelable(false)
                        .setPositiveButton("OUI", new DialogInterface.OnClickListener() {
                            public void onClick(DialogInterface dialog, int id) {


                IRamasseur IUser = APIClient.getClient().create(IRamasseur.class);
                IUser.addtomycollection(datecollecte.getText().toString(),"ENCOURS",Integer.parseInt(string),Integer.parseInt(y)).enqueue(new Callback<Donnation>() {
                    @Override
                    public void onResponse(Call<Donnation> call, Response<Donnation> response) {
                        Log.v("Added", "cette donnation est ajouter avec succes");
                        Intent intent = new Intent(getApplicationContext(), PlaningRamasseur.class);
                        startActivity(intent);
                    }

                    @Override
                    public void onFailure(Call<Donnation> call, Throwable t) {
                        Log.e("failure", t.getLocalizedMessage());
                        Intent intent = new Intent(getApplicationContext(), PlaningRamasseur.class);
                        startActivity(intent);

                    }
                });

                            }
                        })
                        .setNegativeButton("Non", new DialogInterface.OnClickListener() {
                            public void onClick(DialogInterface dialog, int id) {
                                dialog.cancel();
                            }
                        });
                AlertDialog alert = builder.create();
                alert.show();


            }
        });
    }
}