# Gerenciamento de Estado

## Visão Geral

- **Estado Local**: React Hooks (`useState`, `useReducer`)
- **Estado Global**: Redux/Zustand
- **Estado do Servidor**: React Query 
- **Estado de Formulários**: React Hook Form
- **Estado de URL**: React Router


## Troubleshooting

### Estado não atualiza

- Verificar imutabilidade
- Usar spread operator 
- Verificar dependências de useEffect

### Re-renders excessivos

- Usar React DevTools Profiler
- Usar useCallback e useMemo

### Estado perdido ao navegar

- Implementar persistência
- Usar React Query para dados do servidor
- Verificar key props em listas

## Recursos

- [React Hooks](https://react.dev/reference/react)
- [React Query](https://tanstack.com/query/latest)
- [Zustand](https://github.com/pmndrs/zustand)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Hook Form](https://react-hook-form.com/)

**Versão:** 1.0  
**Última Atualização:** 19 de Novembro de 2025  
**Autor:** Salomão de Moraes