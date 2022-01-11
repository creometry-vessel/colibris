package com.esprit.go_recycle;

import android.app.AlertDialog;
import android.app.DatePickerDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.TextView;

import com.esprit.go_recycle.classes.APIClient;
import com.esprit.go_recycle.dao.IEvenement;
import com.esprit.go_recycle.dao.IRamasseur;
import com.esprit.go_recycle.models.Donnation;
import com.esprit.go_recycle.models.Evenement;
import com.esprit.go_recycle.models.Map;

import java.util.ArrayList;
import java.util.Calendar;

import androidx.annotation.NonNull;
import androidx.cardview.widget.CardView;
import androidx.recyclerview.widget.RecyclerView;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class InfoAdapter extends RecyclerView.Adapter<InfoAdapter.myViewHolder> {
    private ArrayList<Map> maps = new ArrayList<>();
    private Context context;
    CardView carddetail;


    public InfoAdapter(Context context, ArrayList<Map> maps) {
        this.maps = maps;
        this.context = context;

    }

    public class myViewHolder extends RecyclerView.ViewHolder {
        private TextView id_produit, quantite, id, prenom;
        Button btnstausdonnation;

        public myViewHolder(final View view) {
            super(view);
            id_produit = itemView.findViewById(R.id.produitname);
            quantite = itemView.findViewById(R.id.detailqantite);
            id = itemView.findViewById(R.id.iddonnation);
            prenom = itemView.findViewById(R.id.prenom);
            btnstausdonnation = itemView.findViewById(R.id.btnstausdonnation);
            carddetail = itemView.findViewById(R.id.carddetail);



        }
    }

    @NonNull
    @Override
    public InfoAdapter.myViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.iteminfo, parent, false);
        return new InfoAdapter.myViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull InfoAdapter.myViewHolder holder, int position) {
        String nom = maps.get(position).getNomp();
        Log.v("heyyyyyyyyynom", "" + nom);
        String date = maps.get(position).getPrenom();
        String id = String.valueOf(maps.get(position).getId_donnation());
        int qte = Integer.parseInt(maps.get(position).getQuantite());


        holder.id_produit.setText(nom);
        holder.prenom.setText(date);
        holder.id.setText(id);
        holder.quantite.setText("Vous avez mis " + qte + " Piéce(s)");


    }

    @Override
    public int getItemCount() {
        return maps.size();
    }

    public void Addtomycollection(String date_collecte,String Etat, int id_ramasseur,int id_donnation) {
        IRamasseur Iev = APIClient.getClient().create(IRamasseur.class);
        Iev.addtomycollection(date_collecte,Etat, id_ramasseur,id_donnation).enqueue(new Callback<Donnation>() {
            @Override
            public void onResponse(Call<Donnation> call, Response<Donnation> response) {
                Log.v("dddddddaaa", response + "");


            }

            @Override
            public void onFailure(Call<Donnation> call, Throwable t) {

            }


        });
    }
}


