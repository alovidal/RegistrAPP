import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private strg: Storage = new Storage();
  private storageReady: Promise<void>;

  constructor(private storage: Storage) {
    this.storageReady = this.init();
  }

  async init(): Promise<void> {
    const storage = await this.storage.create();
    this.strg = storage;
  }

  async StrgListo(): Promise<void> {
    await this.storageReady;
  }

  async get(key: string): Promise<any> {
    await this.StrgListo()
    return this.storage?.get(key);
  }

  async set(key: string, valor: any) {
    await this.StrgListo()
    this.storage.set(key, valor);
  }
  async remove(key: string) {
    await this.StrgListo()
    this.storage.remove(key);
  }

  async limpiar() {
    await this.StrgListo()
    this.storage.clear();
  }
}
