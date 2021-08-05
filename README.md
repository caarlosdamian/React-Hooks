# React Hooks <img src="./public/logo192.png" width="150px" style="position: absolute; right: 10px">

Entendiendo como funcionan los Hooks en React
<hr>

### Cómo ejecutar el proyecto:

**Puede clonar el proyecto y ejecutarlo localmente siguiendo los pasos a continuación**

1. `git clone git@github.com:caarlosdamian/react-hooks-course.git` para clonar el proyecto
2. `yarn` o `npm install` para instalar las dependencias del proyecto
3. `yarn start` o `npm start` 
4. Accesar [http://localhost:3000](http://localhost:3000) en el navegador

### Cómo probar cada uno de los hooks:
1. Abra el archivo App.js. Puedes ver que hay varias líneas comentadas, tanto en la parte de importación como dentro de la función.
2. Descomente la importación del Hook que desea probar y también la línea dentro de la función (hay otro comentario al final de la línea que indica a qué Hook pertenece).
<hr>

## Explicación de cada Hook:

### useState
Es una función de control de estado:
- **recibe un parámetro** (valor inicial de este estado)
- **devuelve una lista con 2 variables** (la primera es el valor del estado en sí y la segunda es la función que actualiza ese estado)
```js
const [state, setState] = useState(0);
```

 `setState` utilizará para actualizar los valores de estado, por ejemplo:

```js
  function incremento(){
    setState(state + 1)
  }
```

### useEffect
- **toma dos parámetros:** una función y una lista de dependencias. Cuando se cambia cualquier elemento de esta lista, la función se ejecuta automáticamente.
- **el retorno de la función puede ser una función.** Si es así, se ejecutará cuando se desmonte el componente.

```js
  useEffect(() => {
    console.log(state)
  }, [state])
```

Cuando la lista de dependencias está vacía, la función se ejecutará cuando se procese el componente. Se ejecuta de forma asincrónica después de un renderizado en pantalla.

### useContext
Es una forma de que más de un componente acceda a la funcionalidad / lógica de un programa. Para ello, se crea uno `const Context` usando `React.createContext`.

```js
const Context = createContext()
```
Creamos un componente que será el proveedor de los datos que tenga en nuestro contexto.


```js
export function PageContextProvider({children}) {
  const [state, setState] = useState(0);

  const increment = useCallback(()=>{
    setState(state + 1)
  },[state])

  const decrement = useCallback(()=>{
    setState(state - 1)
  },[state])

  const handleChange = useCallback((event)=>{
    setState(Number(event.target.value))
  },[state])

  return (
    <Context.Provider value={{
        state, 
        increment, 
        decrement, 
        handleChange}
        }>
        {children}
    </Context.Provider>
  )
}
```
Tenga en cuenta que `Context.Provider` Recibe una propiedad `children` y utiliza esas propiedades para representar todos los componentes.

```js
<PageContextProvider>
    <PageInputContext/>
</PageContextProvider>
```

`PageInputContext` Es un componenta hijo de  `PageContextProvider` y para accesar a las propiedades que se le encia es preciso llamar a `useContext` pasando como paramentro `Context`,creado con `React.createContext`

```js
export default function PageInputContext(){
    const {state, increment, decrement, handleChange} = useContext(Context)
}
```

### useReducer
En el  `useState` la lógica de actualización de datos está dentro de donde se llamó, en el  `UseReducer` la lógica estará en una función, como la que se  `reducer` muestra a continuacion.

```js
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
    default:
      return action.newState;
  }
}
```

- **recibe hasta 3 parámetros:** el primero es la función que cambia el estado, el segundo es el estado inicial y el tercero es una función de inicio si es necesario ejecutar algo cuando se crea el estado
- **devuelve una lista con 2 elementos:** el valor del estado en sí y el despacho, que es como llamaremos a la función para actualizar el estado, que dispara la llamada a la función reducer

```js
const [state, dispatch] = useReducer(reducer, 0);
```

Por lo general, es mejor usarlo  `useReducer` cuando tiene una lógica compleja en el estado que involucra múltiples subvalores o cuando el siguiente estado depende del anterior. También le permite optimizar el rendimiento de algunos componentes, ya que puede pasar un en`dispatch` en lugar de `callbacks`.

```js
<button onClick={() => dispatch({ type: "decrement" })}>
```

### useCallback
Para cada cambio en el valor de`state`, creamos un `callback` diferente: `increment`, `decrement` e `handleChange`
- **toma 2 parámetros:** una función y una lista de dependencias. Esta función se [memoriza](https://es.wikipedia.org/wiki/Memoizaci%C3%B3n) y solo se volverá a renderizar cuando se cambie uno de los valores en la lista de dependencias.
```js
const increment = useCallback(()=>{
    setState(state + 1)
},[state])

const decrement = useCallback(()=>{
    setState(state - 1)
},[state])

const handleChange = useCallback((event)=>{
    setState(Number(event.target.value))
},[state])
```
La función que no se recarga todo el tiempo hace que el procesamiento sea mucho más fácil.

### useMemo
Al igual que el `useCallback`:
- **toma 2 parámetros:** una función y una lista de dependencias.. 

```js
const memorizedValue = useMemo(() => {
    if(state > state2){
      return 'Mayor'
    }else if(state < state2){
      return 'Menor'
    }else{
      return 'Igual'
    }
}, [state, state2])
```

El valor de retorno de la función se [memoriza](https://es.wikipedia.org/wiki/Memoizaci%C3%B3n) y solo se recargará cuando se cambie uno de los valores en la lista de dependencias.

### useRef
- **devuelve la referencia de un objeto mutable** que existirá durante la vida útil del componente.

```js
export default function InputTexto() {
    const inputRef = useRef(null);
    const focaInput = () => {
      inputRef.current.focus();
    };
    return (
      <div className="content refContent">
        <input ref={inputRef} type="text" />
        <button className="focusButton" onClick={focaInput}>Enfocar Input</button>
      </div>
    );
}
```

Para acceder al objeto es necesario utilizar la propiedad `.current` de `useRef`.

### useImperativeHandle
Se utiliza para pasar un componente  `ref` a un componente principal y debe combinarse con `fowardRef`.

```js
function InputTextoImperative(props, ref) {
    
    const inputRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => {
          inputRef.current.focus();
        }, 
        console: () => {
          console.log('prueba')
        }
    }));

    return (
      <div className="content">
        <input ref={inputRef} type="text" />
      </div>
    );
}

export default forwardRef(InputTextoImperative);
```

Puede colocar un botón en`App.js` (componente principal) y llamar a la función del componente secundario.

```js
<InputTextoImperative ref={inputRef}/> 
<button className="focusButton" onClick={focaInput}>Enfocar Input</button>
```

### useLayoutEffect
Es muy similar a `useEffect`, pero se activa sincrónicamente después de todos los cambios de DOM y antes de que aparezca algo en la pantalla.

```js
useLayoutEffect(() => {
    console.log('layout');
}, [])
```

Es preferible utilizar `useEffect` para evitar bloquear las actualizaciones visuales.

**¿Cuándo usar?** 
 Notarás que el elemento estará parpadeando / ejecutándose varias veces al usar el `useEffect`en este caso lo ideal es cambiar a `useLayoutEffect`.

### useDebugValue
Se usa junto con la extensión [React Dev Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) para mostrar el contenido de algún estado, como si fuera un `console.log`.

```js
function useAnalyzeState(state) {
  useDebugValue(`Valor de state = ${state}`);
  return state;
}
```

Como su nombre lo indica, se utiliza para depurar.
