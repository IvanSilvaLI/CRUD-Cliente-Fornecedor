import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Fornecedor } from '../fornecedor';

@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.css']
})
export class FornecedorComponent implements OnInit {
  fornecedorForm: FormGroup;
  fornecedores: Fornecedor[] = [];
  isEditing : boolean = false;


  constructor(private formBuilder: FormBuilder, private dataService: DataService) {
    this.fornecedorForm = this.formBuilder.group({
      id: [''],
      nome: ['', Validators.required],
      tipoProduto:['', Validators.required],
      endereco: ['', Validators.required],
      ativo: ['', Validators.required]

    });
  }

  ngOnInit(): void {
    this.getFornecedores();

  }
  getFornecedores() {
    this.dataService.getFornecedores().subscribe(
      {
        next : data => this.fornecedores = data

 
      }
    );
  }

  criarFornecedor() {
    if (this.isEditing) {
      this.dataService.updateFornecedor(this.fornecedorForm.value).subscribe({
        next: () => {
          this.getFornecedores();
          this.fornecedorForm.reset();
          this.isEditing = false;
        }
      });
    } else {
      this.dataService.adicionarFornecedor(this.fornecedorForm.value).subscribe({
        next: (data) => {
          this.fornecedores.push(data);
          this.fornecedorForm.reset();
        }
      });
    }
  }

  editarFornecedor(fornecedor:Fornecedor){
    const { id, ...clienteSemId } = fornecedor;
    this.fornecedorForm.setValue(fornecedor);
    this.isEditing = true;

  }

  deletarFornecedor(id: number) {
    if (confirm('Deseja realmente deletar este fornecedor?')) {
      this.dataService.deletarFornecedor(id).subscribe(() => {
        // Remove o fornecedor da lista local
        this.fornecedores = this.fornecedores.filter(fornecedor => fornecedor.id !== id);
        console.log('Fornecedor deletado com sucesso!');
      });
    }
  }
  
}
