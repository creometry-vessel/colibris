package com.esprit.go_recycle;

import androidx.appcompat.app.AppCompatActivity;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

import android.app.DatePickerDialog;
import android.app.TimePickerDialog;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.TimePicker;

import com.esprit.go_recycle.classes.APIClient;
import com.esprit.go_recycle.dao.IEvenement;
import com.esprit.go_recycle.dao.IUser;
import com.esprit.go_recycle.models.Adresse;
import com.esprit.go_recycle.models.Evenement;
import com.esprit.go_recycle.models.Participation;

import java.util.Calendar;

public class AjouterEvenemnt extends AppCompatActivity {
EditText dateevents,lieuevents,nomevenemnt,temps;
Button addevent;
    DatePickerDialog datePickerDialog;
    int year;
    int month;
    int mHour;
    int mMinute;
    int dayOfMonth;
    Calendar calendar;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_ajouter_evenemnt);
        nomevenemnt=findViewById(R.id.nomevenemnt);
        lieuevents=findViewById(R.id.lieuevents);
        dateevents=findViewById(R.id.dateevents);
        temps=findViewById(R.id.temps);
        addevent=findViewById(R.id.addevent);
        dateevents.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {


                    calendar = Calendar.getInstance();
                    year = calendar.get(Calendar.YEAR);

                    month = calendar.get(Calendar.MONTH);
                    dayOfMonth = calendar.get(Calendar.DAY_OF_MONTH);
                    datePickerDialog = new DatePickerDialog(AjouterEvenemnt.this,
                            new DatePickerDialog.OnDateSetListener() {
                                @Override
                                public void onDateSet(DatePicker datePicker, int year, int month, int day) {
                                    dateevents.setText(year + "-" + (month + 1) + "-" + day);
                                }
                            }, year, month, dayOfMonth);
                    datePickerDialog.getDatePicker().setMinDate(System.currentTimeMillis());
                    datePickerDialog.show();
                    // Get Current Time
                    final Calendar c = Calendar.getInstance();
                    mHour = c.get(Calendar.HOUR_OF_DAY);
                    mMinute = c.get(Calendar.MINUTE);

                    // Launch Time Picker Dialog
                    TimePickerDialog timePickerDialog = new TimePickerDialog(AjouterEvenemnt.this,
                            new TimePickerDialog.OnTimeSetListener() {

                                @Override
                                public void onTimeSet(TimePicker timePicker, int i, int i1) {
                                    temps.setText(i + ":" + i1);
                                }

                            }, mHour, mMinute, false);
                    timePickerDialog.show();
                }

        });

        SharedPreferences prefs = getSharedPreferences("IdUser",
                MODE_PRIVATE);
        final String string = prefs.getString("Key", null);

        addevent.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Log.v("yess ","im clicked");
                String nom,lieu,date;
                nom=nomevenemnt.getText().toString();
                lieu=lieuevents.getText().toString();
                date=dateevents.getText().toString()+temps.getText().toString();
                Log.v("yess ","im here"+nom+lieu+date);
                IEvenement myad = APIClient.getClient().create(IEvenement.class);
                myad.addevent(nomevenemnt.getText().toString(),lieuevents.getText().toString(),dateevents.getText().toString()).enqueue(new Callback<Evenement>() {
                    @Override
                    public void onResponse(Call<Evenement> call, Response<Evenement> response) {
                        Log.v("TAG!!!!!!!!!!!!!!!!!", "step 1" );
                    }

                    @Override
                    public void onFailure(Call<Evenement> call, Throwable t) {
                        Log.v("TAG!!!!!!!!!!!!!!!!!", "error3" + t.getMessage());
                    }



                });
                IEvenement lastid = APIClient.getClient().create(IEvenement.class);
                lastid.getdernier().enqueue(new Callback<Evenement>() {
                    @Override
                    public void onResponse(Call<Evenement>  call, Response<Evenement> response) {
                        final int et=Integer.parseInt(response.body().getId_evenement());
                        Log.v(" the id ","fff"+et);
                        Log.v(" the id ","ffff"+string);


                        IEvenement myp = APIClient.getClient().create(IEvenement.class);
                        myp.addpart(et, Integer.parseInt(string),"CREATOR").enqueue(new Callback<Participation>() {
                            @Override
                            public void onResponse(Call<Participation> call, Response<Participation> response) {
                                Intent intent = new Intent(getApplicationContext(), AccueilDonneur.class);
                                Log.v("youhou aded avents","goood");
                                startActivity(intent);

                            }

                            @Override
                            public void onFailure(Call<Participation> call, Throwable t) {
                                Log.v("TAG", "error" + t.getMessage());
                                Intent intent = new Intent(getApplicationContext(), AccueilDonneur.class);
                                Log.v("youhou aded avents","goood");
                                startActivity(intent);
                            }
                        });





                    }

                    @Override
                    public void onFailure(Call<Evenement> call, Throwable t) {
                        Log.v("TAG!!!!!!!!!!!!!!!!!", "error2" + t.getMessage());
                    }



                });
                Intent intent = new Intent(getApplicationContext(), AccueilDonneur.class);
                startActivity(intent);




            }
        });






    }
}