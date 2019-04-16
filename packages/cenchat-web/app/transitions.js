/**
 * @function
 */
export default function () {
  this.transition(
    this.fromRoute('chats.index'),
    this.toRoute('chats.chat'),
    this.use('toLeft'),
    this.reverse('toRight'),
  );

  this.transition(
    this.fromRoute('my-account.index'),
    this.toRoute('my-account.update-info'),
    this.use('toLeft'),
    this.reverse('toRight'),
  );
}