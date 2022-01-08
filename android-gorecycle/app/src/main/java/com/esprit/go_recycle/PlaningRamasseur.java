package com.esprit.go_recycle;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.DefaultItemAnimator;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

import android.app.usage.UsageEvents;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.os.Bundle;
import android.util.EventLog;
import android.util.Log;
import android.widget.CalendarView;
import android.widget.DatePicker;
import android.widget.TextView;

import com.esprit.go_recycle.classes.APIClient;
import com.esprit.go_recycle.dao.IDonnation;
import com.esprit.go_recycle.dao.IRamasseur;
import com.esprit.go_recycle.models.Donation;
import com.esprit.go_recycle.models.Donnation;
import com.esprit.go_recycle.models.Map;

import java.util.ArrayList;
import java.util.List;

public class PlaningRamasseur extends AppCompatActivity {
RecyclerView rc;
CalendarView cv;
private ArrayList<Donation> me;
PlaningAdapter ev;
TextView date;
    private List<Donation> dates = new ArrayList<>();



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_planing_ramasseur);
        cv=findViewById(R.id.calendarView);
        date=findViewById(R.id.dater);
        rc=findViewById(R.id.recyclehorizontale);

        SharedPreferences prefs = getSharedPreferences("IdUser",
                MODE_PRIVATE);
        final String string = prefs.getString("idramasseur", null);
        Log.v("thetet","lerammaseurplaning est "+string);

       IRamasseur IUser = APIClient.getClient().create(IRamasseur.class);

        IUser.datecollecte(string).enqueue(new Callback<List<Donnation>>() {
            @Override
            public void onResponse(Call<List<Donnation>> call, Response<List<Donnation>> response) {
               // UsageEvents.Event ev1=new UsageEvents.Event(Color.RED,14447200,"theday");



                }

            @Override
            public void onFailure(Call<List<Donnation>> call, Throwable t) {

            }



        });

        cv.setOnDateChangeListener(new CalendarView.OnDateChangeListener() {
    @Override
    public void onSelectedDayChange(@NonNull CalendarView calendarView, int i, int i1, int i2) {
        date.setText(i + "-" + (i1 + 1) + "-" + i2);
        String x= date.getText().toString();
        Log.v("thedateis","daaatecollecte"+x);
        IRamasseur IUser = APIClient.getClient().create(IRamasseur.class);
        IUser.getdonnationcalender(x,Integer.parseInt(string)).enqueue(new Callback<List<Donation>>() {
            @Override
            public void onResponse(Call<List<Donation>> call, Response<List<Donation>> response) {

                if (response.isSuccessful()) {
                    me = new ArrayList<>(response.body());
                    ev = new PlaningAdapter(PlaningRamasseur.this, me);
                    RecyclerView.LayoutManager layoutManager = new LinearLayoutManager(getApplicationContext());
                    rc.setLayoutManager(layoutManager);
                    rc.setItemAnimator(new DefaultItemAnimator());
                    rc.setAdapter(ev);
                    Log.v("successssssssssssssssss","ddddd"+ response.body().toString());


                }

            }

            @Override
            public void onFailure(Call<List<Donation>> call, Throwable t) {
                Log.e("failure","ddddd"+ t.getLocalizedMessage());

            }
        });

    }
});






    }


}