export interface InterfaceSecretManagerPlugin {
  initSecret(name: string): Promise<void>;
  getSecretString(name: string): Promise<string | null>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getSecretJson(name: string): Promise<any>;
}
