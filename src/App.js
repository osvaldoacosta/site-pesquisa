

import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { UserContext} from './Providers/User';


function App() {



  return (

    <Router>
      <h1>Site Pesquisa</h1>
      <Switch>
        <Route exact path="/" component={PaginaUm}></Route>
        <Route path="/paginaDois" component={PaginaDois}></Route>
        <Route path="/paginaTres" component={PaginaTres}></Route>
        <Route path="/paginaQuatro" component={PaginaQuatro}></Route>
      </Switch>
    </Router>
  );
}

const PaginaUm = props => {
  const { user, insertField, FIELD_NAMES } = React.useContext(UserContext);

 
  return (

    <form>

      Digite o seu nome:
      <input
        type="text"
        value={user.username}
        onChange={insertField(FIELD_NAMES.FIRST_NAME)}
      />

      <div>
        <p>
        Escreva sobre o que você acha das plataformas de streaming:
        </p>
        <textarea value={user.answerOne} onChange={insertField(FIELD_NAMES.ANSWER_ONE)} />
      </div>
      <Link to={{ pathname: "/paginaDois" }}>
      <input type="submit" value="Avançar" />
      </Link>

    </form>

  )

}

const PaginaDois = () => {
  const { user, insertField, FIELD_NAMES } = React.useContext(UserContext);

  return (

    <div >
      Seu sexo biológico é ?
      <input onChange={insertField(FIELD_NAMES.RADIO)} type="radio" value="Masculino" name="gender" checked = {user.radio === "Masculino"}/> Masculino
      <input onChange={insertField(FIELD_NAMES.RADIO)} type="radio" value="Feminino" name="gender" checked = {user.radio === "Feminino"}/> Feminino

      {user.radio === "Masculino" ? (
        (
          <div>
            <p>
            O que você acha de quando as plataformas de streaming recomendam coisas consideradas "pesadas" ou de conteúdo adulto? 
            </p>
            <input type="text" value={user.answerTwo} onChange={insertField(FIELD_NAMES.ANSWER_TWO)}/>
          </div>

          
        )
      ) : (
        user.radio === "Feminino" ?
          <div>
            <p>
            O que você acha de quando as plataformas de streaming recomendam coisas consideradas "de mulher" ou conteúdo feminino?
            </p>
            <input type="text" value={user.answerTwo} onChange={insertField(FIELD_NAMES.ANSWER_TWO)}/>
          </div>
          : <p>ocorreu algum erro ao carregar a pergunta, por favor voltar ao inicio</p>
         
      )}

      
      <Link to={{ pathname: "/" }}>
        <input type = "submit" value="Voltar" />
      </Link> 

      {(user.radio) ?   
      <Link to={{ pathname: "/paginaTres" }}>
        <input type = "submit" value="Avançar" />
      </Link> 
        : <b>Selecione o seu gênero biologico para prosseguir</b>
        
      }

    </div>
  )
}

const PaginaTres = () => {
  const { user, FIELD_NAMES, insertField } = React.useContext(UserContext);
  return (

    <div>
      Você consome quais tipos de serviços de streaming?
      <p>
      <input type="checkbox" id ="music" defaultChecked={user.isMusic}  onChange={insertField(FIELD_NAMES.IS_MUSIC)} />
      Musicas
      </p>

      <p>
      <input type="checkbox" id ="series" defaultChecked={user.isSeries} onChange={insertField(FIELD_NAMES.IS_SERIES)} />
      Series, filmes ou videos
      </p>

      <p>
      <input type="checkbox" id ="other" defaultChecked={user.isOther} onChange={insertField(FIELD_NAMES.IS_OTHER)} />
      Outros
      </p>

      <Link to={{ pathname: "/paginaDois" }}>
        <input type = "submit" value="Voltar" />
      </Link> 

      <Link to={{pathname: "/paginaQuatro",}}>
      <input type="submit"  value="Avançar" />
      </Link>
    </div>








    



  )

}

const PaginaQuatro = () => {
  const {user, deleteField} = React.useContext(UserContext);

  return (
    <div>
      <h1>Resultado da pesquisa</h1>

      <b>Nome do usuário: </b>
      <p>{user.username}</p>

      
      <b>Escreva sobre o que você acha das plataformas de streaming:</b>
      <p>{user.answerOne}</p>

      <b>Sexo: </b>
      <p>{user.radio}</p>
      
      {user.radio === "Masculino"
       ? <b>O que você acha de quando as plataformas de streaming recomendam coisas consideradas "pesadas" ou de conteúdo adulto?: </b>
       : <b>O que você acha de quando as plataformas de streaming recomendam coisas consideradas "de mulher" ou conteúdo feminino?</b>
      }
      <p>{user.answerTwo}</p>

      <b>Você consome quais tipos de serviços de streaming?</b>
      {user.isSeries === true ? <li>Séries</li> : undefined}
      {user.isMusic === true ? <li>Músicas</li> : undefined}
      {user.isOther === true ? <li>Outros</li> : undefined}        
      <br></br>
      <Link to={{ pathname: "/" }}>
        <input type = "submit" onClick = {deleteField} value="Nova pesquisa" />
      </Link> 





    </div>
    
    
  )
}


export default App;

