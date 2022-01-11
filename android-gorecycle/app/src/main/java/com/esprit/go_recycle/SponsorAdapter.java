package com.esprit.go_recycle;

import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.esprit.go_recycle.models.Evenement;
import com.esprit.go_recycle.models.Sponsor;

import java.util.ArrayList;

import androidx.annotation.NonNull;
import androidx.cardview.widget.CardView;
import androidx.recyclerview.widget.RecyclerView;

public class SponsorAdapter extends RecyclerView.Adapter<SponsorAdapter.myViewHolder> {

    private ArrayList<Sponsor> sponsors=new ArrayList<>();
    private Context context;
    CardView carddetail;

    public SponsorAdapter(Context context, ArrayList<Sponsor> sponsors) {
        this.sponsors=sponsors;
        this.context=context;

    }
    public class myViewHolder extends RecyclerView.ViewHolder{
         TextView nom,numsponsor;
                ImageView image;

        public myViewHolder(final View view) {
            super(view);
            nom=itemView.findViewById(R.id.nomsponsor);
            numsponsor=itemView.findViewById(R.id.numsponsor);
            image=itemView.findViewById(R.id.imagesponor);
            carddetail=itemView.findViewById(R.id.carddetail);




                   /* Intent i = new Intent(v.getContext(),detailsevenemnet.class);
                    i.putExtra("data",creatorevent.getText());
                    Log.v("daa",""+creatorevent.getText());
                    v.getContext().startActivity(i);*/

                }

        }




    @NonNull
    @Override
    public SponsorAdapter.myViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view  = LayoutInflater.from(parent.getContext()).inflate(R.layout.itemsponsor, parent,  false);
        return new SponsorAdapter.myViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull SponsorAdapter.myViewHolder holder, int i) {
        holder.nom.setText(sponsors.get(i).getNom());
        holder.numsponsor.setText(sponsors.get(i).getNum_tel());
        String x=sponsors.get(i).getNom();
        if(x.equals("Baguette")) {
            holder.image.setImageResource(R.drawable.baguette);
        }else if(x.equals("Zen")) {
            holder.image.setImageResource(R.drawable.zen);
        }else{
            holder.image.setImageResource(R.drawable.carrefour);
        }


    }
    @Override
    public int getItemCount() {
        return sponsors.size();
    }
}
