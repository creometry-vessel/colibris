package com.esprit.go_recycle;

import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;

import com.esprit.go_recycle.models.Donnation;
import com.esprit.go_recycle.models.Evenement;

import java.util.ArrayList;

import androidx.annotation.NonNull;
import androidx.cardview.widget.CardView;
import androidx.recyclerview.widget.RecyclerView;

public class DonnationAdapter extends RecyclerView.Adapter<DonnationAdapter.myViewHolder>  {
    private ArrayList<Donnation> donnations=new ArrayList<>();
    private Context context;
    CardView carddetail;


    public DonnationAdapter(Context context, ArrayList<Donnation> donnations) {
        this.donnations=donnations;
        this.context=context;

    }

    public class myViewHolder extends RecyclerView.ViewHolder {
        private TextView id_produit,quantite,temps,datex;
        Button btnstausdonnation;
        public myViewHolder(final View view) {
            super(view);
            id_produit=itemView.findViewById(R.id.produitname);
            quantite=itemView.findViewById(R.id.detailqantite);
            temps=itemView.findViewById(R.id.codedonnation);
            datex=itemView.findViewById(R.id.datedonnation);
            btnstausdonnation=itemView.findViewById(R.id.btnstausdonnation);
            carddetail=itemView.findViewById(R.id.carddetail);
            carddetail.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    Intent i = new Intent(v.getContext(),Detaildemande.class);
                    i.putExtra("code",temps.getText());
                    Log.v("daa",""+temps.getText());

                    v.getContext().startActivity(i);
                }
            });


        }
    }
    @NonNull
    @Override
    public DonnationAdapter.myViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view  = LayoutInflater.from(parent.getContext()).inflate(R.layout.itemlistdonnation, parent,  false);
        return new DonnationAdapter.myViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull myViewHolder holder, int position) {
        String nom=donnations.get(position).getNom();
        Log.v("heyyyyyyyyynom",""+nom);
        String date=donnations.get(position).getDate_remise();
        String id= String.valueOf(donnations.get(position).getId_donnation());
        int qte=donnations.get(position).getQuantite();
        String status=donnations.get(position).getEtat();

        holder.id_produit.setText(nom);
        holder.datex.setText(date);
        holder.temps.setText(id);
        holder.quantite.setText("Vous avez mis "+Integer.toString(qte)+" Piéce(s)");
        holder.btnstausdonnation.setText(status);

    }

    @Override
    public int getItemCount() {
        return donnations.size();
    }


}
