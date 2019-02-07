/**
 * @function
 */
export default function () {
  this.transition(
    this.fromRoute('site.page.chats.index'),
    this.toRoute('site.page.chats.new'),
    this.use('toLeft'),
    this.reverse('toRight'),
  );

  this.transition(
    this.fromRoute('site.page.chats.index'),
    this.toRoute('site.page.chats.chat'),
    this.use('toLeft'),
    this.reverse('toRight'),
  );

  this.transition(
    this.fromRoute('site.page.my-account.index'),
    this.toRoute('site.page.my-account.delete'),
    this.use('toLeft'),
    this.reverse('toRight'),
  );
}
