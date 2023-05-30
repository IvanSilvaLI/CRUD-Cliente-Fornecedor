import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fornecedor } from './fornecedor';
import { Cliente } from './cliente';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.dataUrl}/Cliente`);
  }

  getFornecedores(): Observable<Fornecedor[]> {
    return this.http.get<Fornecedor[]>(`${this.dataUrl}/Fornecedor`);
  }

  adicionarCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.dataUrl}/Cliente`, { ...cliente, id: null });
  }  

  adicionarFornecedor(fornecedor: Fornecedor): Observable<Fornecedor> {
    return this.http.post<Fornecedor>(`${this.dataUrl}/Fornecedor`, { ...fornecedor, id: null });
  }

  deletarCliente(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.dataUrl}/Cliente/${id}`);
  }

  deletarFornecedor(id: number): Observable<Fornecedor> {
    return this.http.delete<Fornecedor>(`${this.dataUrl}/Fornecedor/${id}`);
  }

  updateCliente(cliente: Cliente): Observable<Cliente>{
    return this.http.put<Cliente>(`${this.dataUrl}/Cliente/${cliente.id}`, cliente);
  }

  updateFornecedor(fornecedor: Fornecedor): Observable<Fornecedor>{
    return this.http.put<Fornecedor>(`${this.dataUrl}/Fornecedor/${fornecedor.id}`, fornecedor);
  }
  
}
