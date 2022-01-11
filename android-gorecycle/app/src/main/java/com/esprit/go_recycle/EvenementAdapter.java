package com.esprit.go_recycle;

import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.res.Resources;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;

import com.esprit.go_recycle.classes.APIClient;
import com.esprit.go_recycle.dao.IEvenement;
import com.esprit.go_recycle.models.Evenement;

import java.util.ArrayList;
import java.util.List;

import androidx.annotation.NonNull;
import androidx.cardview.widget.CardView;
import androidx.recyclerview.widget.RecyclerView;
import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class EvenementAdapter extends RecyclerView.Adapter<EvenementAdapter.myViewHolder> {
    private ArrayList<Evenement> evenements=new ArrayList<>();
    private Context context;


    public EvenementAdapter(Context context, ArrayList<Evenement> evenements) {
        this.evenements=evenements;
        this.context=context;

    }





/*    public void SetData(List<Evenement>evenements){

        this.evenements=evenements;
        notifyDataSetChanged();
    }*/
  /* public void setData(List<Evenement> evenements) {
        this.evenements = evenements;
        notifyDataSetChanged();
    }*/

    public class myViewHolder extends RecyclerView.ViewHolder {

        private TextView nomevenement, adressevent, creatorevent, datevent;
        Button btn;
        private CardView card;

        public myViewHolder(final View view) {
            super(view);
            nomevenement = itemView.findViewById(R.id.nomevenement);
            adressevent = itemView.findViewById(R.id.adressevent);
            btn = itemView.findViewById(R.id.btnannuler);

            creatorevent = itemView.findViewById(R.id.creatorevent);
            datevent = itemView.findViewById(R.id.datevent);
            card = itemView.findViewById(R.id.carddetail);
            SharedPreferences prefs = context.getSharedPreferences("IdUser", Context.MODE_PRIVATE);
            final String string = prefs.getString("Key", null);
            Log.v("ddd","youhou itswork"+string);

            card.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                 /*   deleteUser(Integer.parseInt(creatorevent.getText().toString()),Integer.parseInt(string));
                    Log.v("ififififi", ""+(creatorevent.getText().toString())+Integer.parseInt(string));
                    Intent intent = new Intent(v.getContext(), ListEvenement.class);
                    v.getContext().startActivity(intent);*/

                }
            });

            view.findViewById(R.id.btnannuler).setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(final View v) {
                    AlertDialog.Builder builder = new AlertDialog.Builder(context);
                    builder.setMessage("Voulez vous annuler votre participation ")
                            .setCancelable(false)
                            .setPositiveButton("OUI", new DialogInterface.OnClickListener() {
                                public void onClick(DialogInterface dialog, int id) {

                                    deleteUser(Integer.parseInt(creatorevent.getText().toString()),Integer.parseInt(string));
                                    Log.v("ififififi", ""+(creatorevent.getText().toString())+Integer.parseInt(string));
                                    Intent intent = new Intent(v.getContext(), ListEvenement.class);
                                    v.getContext().startActivity(intent);


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
    @NonNull
    @Override
    public myViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.itemlistevenment,parent,false);
        return new EvenementAdapter.myViewHolder(view);

    }

   /* @Override
    public void onBindViewHolder(@NonNull myViewHolder holder, int position) {
        Evenement evenement = evenements.get(position);
        String nomevent=evenement.getNom();
        String adresse=evenement.getLieu();
        String daate=evenement.getDate();
        holder.nomevenement.setText(nomevent);
        holder.adressevent.setText(adresse);
        holder.datevent.setText(daate);
        viewHolder.car_name.setText(evenements.get(i).getName());
        viewHolder.car_desc.setText(evenements.get(i).getDesc());
    }*/
    public void onBindViewHolder(@NonNull final EvenementAdapter.myViewHolder viewHolder, final int i) {
        viewHolder.creatorevent.setText(String.valueOf(evenements.get(i).getId_evenement()));
        viewHolder.nomevenement.setText(evenements.get(i).getNom());
        viewHolder.adressevent.setText(evenements.get(i).getLieu());
        viewHolder.datevent.setText(evenements.get(i).getDate());








    }



    @Override
    public int getItemCount() {
        return evenements.size();
    }
    public void deleteUser(int id,int id_donneur){
        IEvenement Iev = APIClient.getClient().create(IEvenement.class);
        Iev.deleteev(id,id_donneur).enqueue(new Callback<Evenement>() {
            @Override
            public void onResponse(Call<Evenement> call, Response<Evenement> response) {
                Log.v("dddddddaaa", response+"");


            }

            @Override
            public void onFailure(Call<Evenement> call, Throwable t) {

            }





        });

    }


}
