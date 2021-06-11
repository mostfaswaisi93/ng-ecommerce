import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice } from 'src/app/models/invoice';
import { ErrorHandler } from 'src/app/shared/error-handler';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private invoiceUrl = `http://localhost:3000/invoices`;
  private errorHandler: ErrorHandler = new ErrorHandler();

  constructor(private http: HttpClient) { }

  getUserInvoice(id: number): Observable<Invoice> {
    try {
      return this.http.get<Invoice>(`${this.invoiceUrl}/${id}`);
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }
}
