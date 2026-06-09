#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Script básico para calcular el Índice de Moran de Autocorrelación Espacial en Python.
Desarrollado para el portafolio académico de Ruby Aymara Condori Espinoza (Código: 214419)
Curso: Estadística Espacial (EST334)
"""

import os
import pandas as pd
import numpy as np

# Intentar importar matplotlib para graficación, si no está instalado, el script continuará
try:
    import matplotlib.pyplot as plt
    PLOT_AVAILABLE = True
except ImportError:
    PLOT_AVAILABLE = False
    print("Aviso: 'matplotlib' no está instalado. El gráfico de dispersión no se generará.")

# ============================================================================
# 1. CONFIGURACIÓN GEOGRÁFICA (25 DEPARTAMENTOS DEL PERÚ)
# ============================================================================

# Lista ordenada de departamentos de acuerdo a los códigos oficiales UBIGEO (1-25)
DEPARTAMENTOS = {
    1: "Amazonas", 2: "Ancash", 3: "Apurímac", 4: "Arequipa", 5: "Ayacucho",
    6: "Cajamarca", 7: "Callao", 8: "Cusco", 9: "Huancavelica", 10: "Huánuco",
    11: "Ica", 12: "Junín", 13: "La Libertad", 14: "Lambayeque", 15: "Lima",
    16: "Loreto", 17: "Madre de Dios", 18: "Moquegua", 19: "Pasco", 20: "Piura",
    21: "Puno", 22: "San Martín", 23: "Tacna", 24: "Tumbes", 25: "Ucayali"
}

# Diccionario de adyacencia Queen (Vecinos terrestres directos)
VECINOS_QUEEN = {
    1: [6, 13, 22, 16],       # Amazonas
    2: [13, 10, 19, 15],      # Ancash
    3: [5, 8, 4],             # Apurimac
    4: [11, 5, 3, 8, 21, 18],  # Arequipa
    5: [9, 11, 4, 3, 8, 12],   # Ayacucho
    6: [20, 14, 13, 1],       # Cajamarca
    7: [15],                  # Callao (Enclavado en Lima)
    8: [12, 25, 17, 21, 4, 3, 5], # Cusco
    9: [15, 12, 5, 11],       # Huancavelica
    10: [2, 13, 22, 16, 25, 19], # Huanuco
    11: [15, 9, 5, 4],        # Ica
    12: [19, 25, 8, 5, 9, 15],  # Junin
    13: [14, 6, 1, 22, 10, 2], # La Libertad
    14: [20, 6, 13],          # Lambayeque
    15: [2, 19, 12, 9, 11, 7],  # Lima
    16: [1, 22, 25],          # Loreto
    17: [25, 8, 21],          # Madre de Dios
    18: [4, 21, 23],          # Moquegua
    19: [2, 10, 25, 12, 15],   # Pasco
    20: [24, 14, 6],          # Piura
    21: [8, 17, 4, 18, 23],   # Puno
    22: [1, 13, 10, 16],      # San Martin
    23: [18, 21],             # Tacna
    24: [20],                 # Tumbes
    25: [16, 10, 19, 12, 8, 17] # Ucayali
}

# Normalización de texto para mapear nombres de departamentos del CSV
def normalizar_texto(texto):
    if pd.isna(texto):
        return ""
    import unicodedata
    texto_str = str(texto).strip().lower()
    # Eliminar acentos
    texto_str = ''.join(c for c in unicodedata.normalize('NFD', texto_str)
                       if unicodedata.category(c) != 'Mn')
    # Remover caracteres especiales y espacios adicionales
    texto_str = texto_str.replace("departamento", "").replace("depto", "").strip()
    return texto_str

# Mapeo de texto normalizado a código (1-25)
MAPA_DEPT_A_COD = {normalizar_texto(name): code for code, name in DEPARTAMENTOS.items()}
# Ajuste manual para casos particulares
MAPA_DEPT_A_COD["cuzco"] = 8
MAPA_DEPT_A_COD["el callao"] = 7
MAPA_DEPT_A_COD["provincia constitucional de callao"] = 7
MAPA_DEPT_A_COD["provincia constitucional del callao"] = 7

# ============================================================================
# 2. CONSTRUCCIÓN DE LA MATRIZ DE PESOS ESPACIALES (W)
# ============================================================================
def construir_matriz_pesos():
    N = 25
    W = np.zeros((N, N))
    
    for i in range(1, N + 1):
        vecinos = VECINOS_QUEEN[i]
        for v in vecinos:
            # UBIGEO es 1-indexed, los arrays de numpy son 0-indexed
            W[i-1, v-1] = 1.0
            
    # Estandarización por filas (cada peso w_ij = 1 / cantidad de vecinos de i)
    for i in range(N):
        row_sum = np.sum(W[i])
        if row_sum > 0:
            W[i] = W[i] / row_sum
            
    return W

# ============================================================================
# 3. CÁLCULO DE ÍNDICE DE MORAN GLOBAL
# ============================================================================
def calcular_moran_global(x, W):
    """
    Calcula el Índice de Moran Global de forma explícita.
    x: Array de numpy de tamaño N
    W: Matriz de pesos espaciales estandarizada de tamaño NxN
    """
    N = len(x)
    mean_x = np.mean(x)
    
    # Desviaciones con respecto a la media
    z = x - mean_x
    
    # Suma de cuadrados de desviaciones
    sum_sq = np.sum(z ** 2)
    if sum_sq == 0:
        return 0.0, 0.0, 0.0, 0.0, 1.0
    
    # Retardo Espacial (Spatial Lag): Wz = W * z
    wz = np.dot(W, z)
    
    # Índice de Moran Observado (I)
    I_observed = (N / np.sum(W)) * (np.dot(z, wz) / sum_sq)
    
    # ── Estadísticos Teóricos bajo la hipótesis nula de aleatoriedad espacial ──
    E_I = -1.0 / (N - 1)
    
    # Parámetros S0, S1, S2 para varianza
    S0 = np.sum(W)
    S1 = 0.5 * np.sum((W + W.T) ** 2)
    S2 = np.sum((np.sum(W, axis=1) + np.sum(W, axis=0)) ** 2)
    
    # Kurtosis
    m4 = np.sum(z ** 4) / N
    m2 = np.sum(z ** 2) / N
    b2 = m4 / (m2 ** 2) if m2 > 0 else 3.0
    
    # Varianza bajo aleatorización
    A = N * ((N**2 - 3*N + 3) * S1 - N * S2 + 3 * S0**2)
    B = b2 * ((N**2 - N) * S1 - 2 * N * S2 + 6 * S0**2)
    C = (N - 1) * (N - 2) * (N - 3) * S0**2
    
    Var_I = (A - B) / C - (E_I ** 2) if C > 0 else 0.001
    
    # Z-Score y p-Valor (Prueba de dos colas)
    z_score = (I_observed - E_I) / np.sqrt(Var_I) if Var_I > 0 else 0.0
    
    # p-valor usando la aproximación normal estándar (con math.erf para evitar dependencias de scipy)
    import math
    p_value = 2 * (1 - (0.5 * (1 + math.erf(abs(z_score) / math.sqrt(2)))))
    
    return I_observed, E_I, Var_I, z_score, p_value

# ============================================================================
# 4. CARGA Y PROCESAMIENTO DE DATASETS DE LA ENA
# ============================================================================
def procesar_csv_ena(file_path, modulo_tipo):
    """
    Lee y agrega un dataset de la ENA por departamento.
    modulo_tipo: 'cultivos' (CAP200B) o 'pastos' (CAP200A)
    """
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"No se encontró el archivo: {file_path}")
        
    print(f"\n📂 Leyendo dataset: {os.path.basename(file_path)}...")
    df = pd.read_csv(file_path, encoding='utf-8', low_memory=False)
    
    # Normalizar columna de departamentos
    df['dept_norm'] = df['NOMBREDD'].apply(normalizar_texto)
    df['dept_code'] = df['dept_norm'].map(MAPA_DEPT_A_COD)
    
    # Filtrar registros válidos (que pertenezcan a los 25 departamentos de la muestra)
    df = df[df['dept_code'].notna()]
    df['dept_code'] = df['dept_code'].astype(int)
    
    results = {}
    
    if modulo_tipo == 'cultivos':
        # Módulo 1896 - Cultivos
        # Analizaremos la adopción del Cacao (CACAO) o Papa (PAPA)
        print("💡 Analizando cultivos transitorios y permanentes (Módulo 1896)...")
        # Calculamos la tasa de adopción de Cacao por departamento (proporción de productores que siembran Cacao)
        crop_target = "CACAO"
        
        # Productores únicos por departamento
        prod_totales = df.groupby('dept_code')[['ID_PROD', 'UA']].nunique()
        # Creamos una columna única de identificación de UA
        df['ua_id'] = df['ID_PROD'].astype(str) + "_" + df['UA'].astype(str)
        
        # Productores totales por departamento (UAs únicas)
        totales = df.groupby('dept_code')['ua_id'].nunique()
        
        # Productores con cultivo Cacao
        cacao_df = df[df['P224B_NOM'].astype(str).str.upper().str.strip() == crop_target]
        productores_cacao = cacao_df.groupby('dept_code')['ua_id'].nunique()
        
        # Combinar
        res_df = pd.DataFrame({'total': totales, 'cacao': productores_cacao}).fillna(0)
        res_df['tasa'] = res_df['cacao'] / res_df['total']
        
        # Rellenar departamentos que no tengan registros
        for i in range(1, 26):
            val = res_df.loc[i, 'tasa'] if i in res_df.index else 0.0
            results[i] = val
            
        var_name = f"Tasa de adopción de {crop_target} (Mód. 1896)"
        
    else:
        # Módulo 1895 - Pastos
        print("💡 Analizando pastos cultivados (Módulo 1895)...")
        # Calculamos la adopción de Pasto Braquiaria (PASTO BRAQUIARIA)
        pasture_target = "PASTO BRAQUIARIA"
        df['ua_id'] = df['ID_PROD'].astype(str) + "_" + df['UA'].astype(str)
        
        totales = df.groupby('dept_code')['ua_id'].nunique()
        braquiaria_df = df[df['P204_NOM'].astype(str).str.upper().str.strip() == pasture_target]
        productores_braquiaria = braquiaria_df.groupby('dept_code')['ua_id'].nunique()
        
        res_df = pd.DataFrame({'total': totales, 'braquiaria': productores_braquiaria}).fillna(0)
        res_df['tasa'] = res_df['braquiaria'] / res_df['total']
        
        for i in range(1, 26):
            val = res_df.loc[i, 'tasa'] if i in res_df.index else 0.0
            results[i] = val
            
        var_name = f"Tasa de adopción de {pasture_target} (Mód. 1895)"
        
    return results, var_name

# ============================================================================
# 5. GRAFICACIÓN DEL SCATTER PLOT DE MORAN (LISA Scatterplot)
# ============================================================================
def generar_grafico_moran(x, W, var_name, output_path="moran_scatterplot.png"):
    if not PLOT_AVAILABLE:
        return
        
    mean_x = np.mean(x)
    std_x = np.std(x)
    z = (x - mean_x) / std_x
    wz = np.dot(W, z)
    
    plt.figure(figsize=(8, 6), dpi=150)
    plt.style.use('dark_background')
    
    # Dibujar los ejes y líneas de cuadrantes
    plt.axhline(0, color='white', linestyle='--', alpha=0.3, linewidth=1)
    plt.axvline(0, color='white', linestyle='--', alpha=0.3, linewidth=1)
    
    # Línea de regresión (Pendiente = Moran's I)
    slope = np.dot(z, wz) / np.sum(z**2)
    x_vals = np.array([np.min(z), np.max(z)])
    y_vals = slope * x_vals
    plt.plot(x_vals, y_vals, color='#8b5cf6', linestyle='-', linewidth=2.5, label=f"Línea de Moran (I = {slope:.4f})")
    
    # Colores para cada cuadrante
    colors = []
    for zi, wzi in zip(z, wz):
        if zi > 0 and wzi > 0:
            colors.append('#ff4757')  # Alto-Alto (Hotspot) - Rojo
        elif zi < 0 and wzi < 0:
            colors.append('#2e86de')  # Bajo-Bajo (Coldspot) - Azul
        elif zi > 0 and wzi < 0:
            colors.append('#f368e0')  # Alto-Bajo - Rosado
        else:
            colors.append('#00d2d3')  # Bajo-Alto - Celeste
            
    # Graficar los puntos de los 25 departamentos
    plt.scatter(z, wz, color=colors, s=120, edgecolors='white', linewidths=0.8, alpha=0.9, zorder=5)
    
    # Añadir etiquetas de texto para algunos departamentos emblemáticos
    for i, (zi, wzi) in enumerate(zip(z, wz)):
        code = i + 1
        name = DEPARTAMENTOS[code]
        # Mostrar etiquetas de departamentos que tengan valores atípicos o altos
        if abs(zi) > 1.2 or abs(wzi) > 1.0:
            plt.text(zi + 0.05, wzi + 0.05, name, fontsize=8, color='white', alpha=0.8)
            
    plt.title(f"Gráfico de Dispersión de Moran (LISA)\nVariable: {var_name}", fontsize=11, fontweight='bold', pad=15)
    plt.xlabel("Valor Estandarizado (z)", fontsize=9, labelpad=8)
    plt.ylabel("Lag Espacial Estandarizado (wz)", fontsize=9, labelpad=8)
    plt.grid(True, linestyle=':', alpha=0.1)
    plt.legend(loc="upper left", frameon=True, facecolor='#101428', edgecolor='rgba(255,255,255,0.1)')
    
    # Agregar zonas de los cuadrantes
    plt.text(plt.xlim()[1] * 0.9, plt.ylim()[1] * 0.8, "Alto-Alto\n(Hotspot)", color='#ff4757', fontsize=8, ha='right')
    plt.text(plt.xlim()[0] * 0.9, plt.ylim()[0] * 0.8, "Bajo-Bajo\n(Coldspot)", color='#2e86de', fontsize=8, ha='left')
    
    plt.tight_layout()
    plt.savefig(output_path, bbox_inches='tight')
    plt.close()
    print(f"✓ Gráfico guardado exitosamente en: {output_path}")

# ============================================================================
# 5. EJECUCIÓN PRINCIPAL
# ============================================================================
def main():
    print("=" * 75)
    print("📊 CÁLCULO DEL ÍNDICE DE MORAN EN PYTHON - PORTAFOLIO EST334 📊")
    print("Estudiante: Ruby Aymara Condori Espinoza (214419)")
    print("=" * 75)
    
    # Rutas locales
    csv_cultivos = "973-Modulo1896/04_CAP200B_1.csv"
    csv_pastos = "973-Modulo1895/03_CAP200A.csv"
    
    # Construir pesos
    W = construir_matriz_pesos()
    
    # Procesar Módulo 1896 (Cultivos)
    try:
        data_cultivos, var_name = procesar_csv_ena(csv_cultivos, 'cultivos')
        x_cultivos = np.array([data_cultivos[i] for i in range(1, 26)])
        
        # Calcular Moran Global
        I, E, Var, Z, p = calcular_moran_global(x_cultivos, W)
        
        print("\n=== RESULTADOS: MÓDULO 1896 (CULTIVOS) ===")
        print(f"Variable Analizada:   {var_name}")
        print(f"Moran Global (I):     {I:.6f}")
        print(f"Valor Esperado E[I]:  {E:.6f}")
        print(f"Varianza Var(I):      {Var:.6f}")
        print(f"Z-Score:              {Z:.4f}")
        print(f"p-Valor:              {p:.6e}")
        
        if p < 0.05:
            if I > 0:
                print("Resultado: AUTOCORRELACIÓN ESPACIAL POSITIVA SIGNIFICATIVA (p < 0.05)")
                print("  -> Departamentos con alta tasa de Cacao tienden a estar rodeados de departamentos similares.")
            else:
                print("Resultado: AUTOCORRELACIÓN ESPACIAL NEGATIVA SIGNIFICATIVA (p < 0.05)")
        else:
            print("Resultado: PATRÓN ESPACIAL ALEATORIO (No significativo, p >= 0.05)")
            
        # Graficar
        generar_grafico_moran(x_cultivos, W, "Cacao - Mód. 1896", "moran_cacao_1896.png")
        
    except Exception as e:
        print(f"❌ Error al procesar cultivos: {e}")
        
    # Procesar Módulo 1895 (Pastos)
    try:
        data_pastos, var_name = procesar_csv_ena(csv_pastos, 'pastos')
        x_pastos = np.array([data_pastos[i] for i in range(1, 26)])
        
        # Calcular Moran Global
        I, E, Var, Z, p = calcular_moran_global(x_pastos, W)
        
        print("\n=== RESULTADOS: MÓDULO 1895 (PASTOS) ===")
        print(f"Variable Analizada:   {var_name}")
        print(f"Moran Global (I):     {I:.6f}")
        print(f"Valor Esperado E[I]:  {E:.6f}")
        print(f"Varianza Var(I):      {Var:.6f}")
        print(f"Z-Score:              {Z:.4f}")
        print(f"p-Valor:              {p:.6e}")
        
        if p < 0.05:
            if I > 0:
                print("Resultado: AUTOCORRELACIÓN ESPACIAL POSITIVA SIGNIFICATIVA (p < 0.05)")
                print("  -> Departamentos con alta adopción de Pasto Braquiaria colindan con similares.")
            else:
                print("Resultado: AUTOCORRELACIÓN ESPACIAL NEGATIVA SIGNIFICATIVA (p < 0.05)")
        else:
            print("Resultado: PATRÓN ESPACIAL ALEATORIO (No significativo, p >= 0.05)")
            
        # Graficar
        generar_grafico_moran(x_pastos, W, "Pasto Braquiaria - Mód. 1895", "moran_pastos_1895.png")
        
    except Exception as e:
        print(f"❌ Error al procesar pastos: {e}")
        
    print("\n" + "=" * 75)
    print("💡 EJECUCIÓN DEL SCRIPT FINALIZADA 💡")
    print("Puedes ver las imágenes de gráficos generadas en esta misma carpeta.")
    print("=" * 75)

if __name__ == "__main__":
    main()
