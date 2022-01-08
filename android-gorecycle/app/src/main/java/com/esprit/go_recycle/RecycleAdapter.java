package com.esprit.go_recycle;

import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import java.util.ArrayList;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

public class RecycleAdapter extends RecyclerView.Adapter<RecycleAdapter.myViewHolder> {

    private ArrayList<modeldetail> modeldetails;
    public RecycleAdapter(ArrayList<modeldetail>modeldetails){

       this.modeldetails=modeldetails;
    }
    public class myViewHolder extends RecyclerView.ViewHolder{
        private TextView produitname,produitqte,codedonnation,datedonncatio;
        public myViewHolder(final View view) {
            super(view);
            this.produitname=itemView.findViewById(R.id.produitname);
            produitqte=itemView.findViewById(R.id.detailqantite);
            codedonnation=itemView.findViewById(R.id.codedonnation);
            datedonncatio=itemView.findViewById(R.id.datedonnation);

            view.findViewById(R.id.btnstausdonnation).setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    Intent intent = new Intent (v.getContext(), Detaildemande.class);
                    v.getContext().startActivity(intent);
                }
            });
        }
    }
    @NonNull
    @Override
    public RecycleAdapter.myViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {

        View itemview= LayoutInflater.from(parent.getContext()).inflate(R.layout.itemlistdonnation,parent,false);
return new myViewHolder(itemview);
    }

    @Override
    public void onBindViewHolder(@NonNull RecycleAdapter.myViewHolder holder, int position) {
         String produiname=modeldetails.get(position).getNomproduit();
         String produitqte=modeldetails.get(position).getQteProduit();
         String codedonnation=modeldetails.get(position).getCodedonnation();
         String datedonncatio=modeldetails.get(position).getDatelivre();
         holder.produitname.setText(produiname);
         holder.produitqte.setText(produitqte);
         holder.codedonnation.setText(codedonnation);
         holder.datedonncatio.setText(datedonncatio);
    }

    @Override
    public int getItemCount() {
        return modeldetails.size();
    }


}
