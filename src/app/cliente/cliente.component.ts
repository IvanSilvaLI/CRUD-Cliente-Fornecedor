import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Cliente } from '../cliente';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  clienteForm: FormGroup;
  clientes: Cliente[] = [];
  isEditing : boolean = false;

  constructor(private formBuilder: FormBuilder, private dataService: DataService) {
    this.clienteForm = this.formBuilder.group({
      id: [''],
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      preferencias: ['', Validators.required],
      genero: ['', Validators.required],
      aceitoTermos: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getClientes();

  }
  getClientes() {
    this.dataService.getClientes().subscribe(
      {
        next : data => this.clientes = data

 
      }
    );
  }

  criarCliente() {
    if (this.isEditing) {
      this.dataService.updateCliente(this.clienteForm.value).subscribe({
        next: () => {
          this.getClientes();
          this.clienteForm.reset();
          this.isEditing = false;
        }
      });
    } else {
      this.dataService.adicionarCliente(this.clienteForm.value).subscribe({
        next: (data) => {
          this.clientes.push(data);
          this.clienteForm.reset();
        }
      });
    }
  }

  editarCliente(cliente:Cliente){
    const { id, ...clienteSemId } = cliente;
    this.clienteForm.setValue(cliente);
    this.isEditing = true;

  }

  deletarCliente(id: number) {
    if (confirm('Deseja realmente deletar este cliente?')) {
      this.dataService.deletarCliente(id).subscribe(() => {
        // Remove o cliente da lista local
        this.clientes = this.clientes.filter(cliente => cliente.id !== id);
        console.log('Cliente deletado com sucesso!');
      });
    }
  }
  
}
