package com.esprit.go_recycle;

import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.esprit.go_recycle.models.Evenement;

import java.util.ArrayList;
import java.util.List;

import androidx.annotation.NonNull;
import androidx.cardview.widget.CardView;
import androidx.recyclerview.widget.RecyclerView;

public class AccueilAdapter extends RecyclerView.Adapter<AccueilAdapter.myViewHolder> {
    private ArrayList<Evenement> evenements=new ArrayList<>();
    private Context context;


    public AccueilAdapter(Context context, ArrayList<Evenement> evenements) {
        this.evenements=evenements;
        this.context=context;

    }
    public class myViewHolder extends RecyclerView.ViewHolder{
        private TextView nomevenement,adressevent,creatorevent,datevent;
        private CardView card1;
        public myViewHolder(final View view) {
            super(view);
            nomevenement=itemView.findViewById(R.id.nomevenement);
            adressevent=itemView.findViewById(R.id.adressevent);
            creatorevent=itemView.findViewById(R.id.creatorevent);
            datevent=itemView.findViewById(R.id.datevent);
            card1=itemView.findViewById(R.id.carddetail);
            card1.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    Intent i = new Intent(v.getContext(),detailsevenemnet.class);
                    i.putExtra("data",creatorevent.getText());
                    Log.v("daa",""+creatorevent.getText());
                    v.getContext().startActivity(i);
                }
            });

            view.findViewById(R.id.Participer).setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                   /* Intent i = new Intent(v.getContext(),detailsevenemnet.class);
                    i.putExtra("data",creatorevent.getText());
                    Log.v("daa",""+creatorevent.getText());
                    v.getContext().startActivity(i);*/

                }
            });
        }
    }



    @NonNull
    @Override
    public myViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view  = LayoutInflater.from(parent.getContext()).inflate(R.layout.itemlistaccueil, parent,  false);
        return new AccueilAdapter.myViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull AccueilAdapter.myViewHolder holder, int i) {
        holder.nomevenement.setText(evenements.get(i).getNom());
        holder.adressevent.setText(evenements.get(i).getLieu());
        holder.datevent.setText(evenements.get(i).getDate());
        holder.creatorevent.setText(evenements.get(i).getId_evenement());

    }
        @Override
    public int getItemCount() {
        return evenements.size();
    }
}