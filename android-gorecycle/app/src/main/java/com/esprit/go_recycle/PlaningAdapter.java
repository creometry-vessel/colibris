package com.esprit.go_recycle;

import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;

import com.esprit.go_recycle.classes.APIClient;
import com.esprit.go_recycle.dao.IEvenement;
import com.esprit.go_recycle.dao.IRamasseur;
import com.esprit.go_recycle.models.Donation;
import com.esprit.go_recycle.models.Donnation;
import com.esprit.go_recycle.models.Evenement;
import com.esprit.go_recycle.models.Ramasseur;

import java.util.ArrayList;

import androidx.annotation.NonNull;
import androidx.cardview.widget.CardView;
import androidx.recyclerview.widget.RecyclerView;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class PlaningAdapter extends RecyclerView.Adapter<PlaningAdapter.myViewHolder>  {
private ArrayList<Donation> donnations=new ArrayList<>();
private Context context;



public PlaningAdapter(Context context, ArrayList<Donation> donnations) {
        this.donnations=donnations;
        this.context=context;

        }

public class myViewHolder extends RecyclerView.ViewHolder {
    private TextView nom,num,adresse,datex,temps,valise;
    Button btnstausdonnation,annuler;
    public myViewHolder(final View view) {
        super(view);
        nom = itemView.findViewById(R.id.nomdo);
        valise = itemView.findViewById(R.id.valise);
        num = itemView.findViewById(R.id.numdo);
        adresse = itemView.findViewById(R.id.adresse);
        datex = itemView.findViewById(R.id.date);
        temps = itemView.findViewById(R.id.temps);
        btnstausdonnation = itemView.findViewById(R.id.afficher);
        annuler = itemView.findViewById(R.id.annuler);
        view.findViewById(R.id.afficher).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(final View v) {

                AlertDialog.Builder builder = new AlertDialog.Builder(context);
                builder.setMessage("Voulez vous Acceder a la discussion de cette donnation ")
                        .setCancelable(false)
                        .setPositiveButton("OUI", new DialogInterface.OnClickListener() {
                            public void onClick(DialogInterface dialog, int id) {


                                Intent intent = new Intent(v.getContext(), MessageActivity.class);
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
        view.findViewById(R.id.annuler).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(final View v) {
                AlertDialog.Builder builder = new AlertDialog.Builder(context);
                builder.setMessage("Vous etes sur de supprimer cet evenement ?")
                        .setCancelable(false)
                        .setPositiveButton("OUI", new DialogInterface.OnClickListener() {
                            public void onClick(DialogInterface dialog, int id) {


                               IRamasseur myp = APIClient.getClient().create(IRamasseur.class);
                                myp.delete(Integer.parseInt(valise.getText().toString()),datex.getText().toString()).enqueue(new Callback<Donnation>() {
                                    @Override
                                    public void onResponse(Call<Donnation> call, Response<Donnation> response) {
                                       Log.i("deleted succs","response.body()");

                                    }

                                    @Override
                                    public void onFailure(Call<Donnation> call, Throwable t) {

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
    @NonNull
    @Override
    public PlaningAdapter.myViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view  = LayoutInflater.from(parent.getContext()).inflate(R.layout.itemlistdonneurs, parent,  false);
        return new PlaningAdapter.myViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull PlaningAdapter.myViewHolder holder, int position) {
        String nom=donnations.get(position).getNom()+donnations.get(position).getPrenom();
        String id= String.valueOf(donnations.get(position).getId_donneur());
        Log.v("heyyyyyyyyynom",""+nom);
        String date=donnations.get(position).getDate_collecte();
        String temps=(donnations.get(position).getTemps());
        String num=(donnations.get(position).getNum_tel());
        String adresse =donnations.get(position).getRue()+donnations.get(position).getRegion()+donnations.get(position).getVille();

        holder.nom.setText(nom);
        holder.valise.setText(id);
        holder.datex.setText(date);
        holder.temps.setText(temps);
        holder.num.setText(num);
        holder.adresse.setText(adresse);


    }

    @Override
    public int getItemCount() {
        return donnations.size();
    }


}
