import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

export interface ProductRating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: ProductRating;
  purchasedAt?: string;
}

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private cartSubject = new BehaviorSubject<Product[]>(this.load('cart'));
  public cart$ = this.cartSubject.asObservable();

  private purchaseHistorySubject = new BehaviorSubject<Product[]>(this.load('history'));
  public history$ = this.purchaseHistorySubject.asObservable();

  private currentUserSubject = new BehaviorSubject<User | null>(this.loadCurrentUser());
  public currentUser$ = this.currentUserSubject.asObservable();

  get currentUser() {
    return this.currentUserSubject.value;
  }

  get cart() {
    return this.cartSubject.value;
  }

  get history() {
    return this.purchaseHistorySubject.value;
  }

  addToCart(product: Product) {
    const updatedCart = [...this.cart, product];
    this.cartSubject.next(updatedCart);
    this.persist('cart', updatedCart);
  }

  confirmPurchase() {
    if (!this.cart.length) {
      return;
    }

    const purchasedItems = this.cart.map((product) => ({
      ...product,
      purchasedAt: new Date().toLocaleString(),
    }));

    const updatedHistory = [...this.history, ...purchasedItems];
    this.purchaseHistorySubject.next(updatedHistory);
    this.persist('history', updatedHistory);
    this.clearCart();
  }

  removeFromCart(index: number) {
    const updatedCart = this.cart.filter((_, i) => i !== index);
    this.cartSubject.next(updatedCart);
    this.persist('cart', updatedCart);
  }

  clearCart() {
    this.cartSubject.next([]);
    this.persist('cart', []);
  }

  // Métodos de Autenticación
  register(name: string, email: string, password: string): { success: boolean; message: string } {
    if (!name || !email || !password) {
      return { success: false, message: 'Todos los campos son requeridos' };
    }

    const users = this.getAllUsers();
    const emailExists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());

    if (emailExists) {
      return { success: false, message: 'El correo ya está registrado' };
    }

    if (password.length < 5) {
      return { success: false, message: 'La contraseña debe tener mínimo 5 caracteres' };
    }

    const newUser: User = {
      id: Date.now().toString(),
      name,
      email: email.toLowerCase(),
      password,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    return { success: true, message: 'Usuario registrado exitosamente' };
  }

  login(email: string, password: string): { success: boolean; message: string } {
    if (!email || !password) {
      return { success: false, message: 'Correo y contraseña requeridos' };
    }

    const users = this.getAllUsers();
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

    if (!user) {
      return { success: false, message: 'Correo o contraseña incorrectos' };
    }

    this.currentUserSubject.next(user);
    localStorage.setItem('currentUser', JSON.stringify(user));

    return { success: true, message: 'Sesión iniciada' };
  }

  logout() {
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
    this.clearCart();
  }

  private getAllUsers(): User[] {
    try {
      const raw = localStorage.getItem('users');
      return raw ? (JSON.parse(raw) as User[]) : [];
    } catch {
      return [];
    }
  }

  private loadCurrentUser(): User | null {
    try {
      const raw = localStorage.getItem('currentUser');
      return raw ? (JSON.parse(raw) as User) : null;
    } catch {
      return null;
    }
  }

  private persist(key: string, items: Product[]) {
    localStorage.setItem(key, JSON.stringify(items));
  }

  private load(key: string): Product[] {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as Product[]) : [];
    } catch {
      return [];
    }
  }
}
