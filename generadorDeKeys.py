import secrets

def generar_clave(tamano: int) -> str:
    """Genera una clave secreta aleatoria de un tamaño específico en bytes.
    
    Args:
        tamano (int): El tamaño de la clave en bytes.
        
    Returns:
        str: La clave secreta en formato hexadecimal.
    """
    clave = secrets.token_bytes(tamano)
    return clave.hex()

# Ejemplo: Generar una clave de 32 bytes (256 bits)
tamano_clave = 32
clave_secreta = generar_clave(tamano_clave)
print(f'Clave secreta generada: {clave_secreta}')
