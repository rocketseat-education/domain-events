# Domain Events

## Bounded Contexts

Dentro do DDD, os contextos da nossa aplicação (módulos / microsserviços). 

## Por que Domain Events?

- Se intercomunicar entre os bounded contexts da aplicação

## Exemplo da vida real:

### Vendas (Sales)

- Fechar a venda (Casos de uso);

### Fiscal (Fiscal)

- Emitir nota fiscal (Casos de uso);
- Cancelar nota fiscal (Casos de uso);

## Problemática

- Como que, ao fechar a venda, eu farei a emissão da nota fiscal?

------

## Diagrama de casos de uso 

Atores -> Casos de uso

------

# Pub/Sub

- Publish (publicadores) / Subscriber (inscrito)

```js
subscribeToEvent('order-created', submitInvoice())
```

```js
const subscribers = {
  'order-created': [submitInvoice()]
}

function createOrder() {
  publishToEvent('order-created', {
    id: 'order-id',
    customer: 'Diego',
  })
}

const eventSubscribers = subscribers['order-created']
```
<!--START_SECTION:footer-->

<br />
<br />

<p align="center">
  <a href="https://discord.gg/rocketseat" target="_blank">
    <img align="center" src="https://storage.googleapis.com/golden-wind/comunidade/rodape.svg" alt="banner"/>
  </a>
</p>

<!--END_SECTION:footer-->
